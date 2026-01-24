import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { generateOrderNumber } from "@/lib/utils";
import { getPaymentProvider, getPaymentMethodType } from "@/lib/payments";
import { createAuditLog } from "@/lib/audit";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const createOrderSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  region: z.string().min(1),
  city: z.string().min(2),
  landmark: z.string().optional(),
  gpsCode: z.string().optional(),
  paymentMethod: z.enum(["momo_mtn", "momo_vodafone", "momo_airteltigo", "card", "bank_transfer"]),
  momoNumber: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    const session = await getSession();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;

    // Get cart
    let cart = null;
    if (session?.userId) {
      cart = await db.cart.findFirst({
        where: { userId: session.userId },
        include: {
          items: {
            include: {
              product: true,
              variant: {
                include: {
                  stockLevels: true,
                },
              },
            },
          },
        },
      });
    } else if (sessionId) {
      cart = await db.cart.findUnique({
        where: { sessionId },
        include: {
          items: {
            include: {
              product: true,
              variant: {
                include: {
                  stockLevels: true,
                },
              },
            },
          },
        },
      });
    }

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems: {
      productId: string;
      variantId: string;
      productName: string;
      variantName: string;
      sku: string;
      price: number;
      quantity: number;
      total: number;
    }[] = [];

    for (const item of cart.items) {
      const price = typeof item.variant.price === 'object' 
        ? Number(item.variant.price) 
        : item.variant.price;
      
      // Check stock
      const availableStock = item.variant.stockLevels.reduce(
        (sum, sl) => sum + sl.quantity - sl.reserved,
        0
      );

      if (availableStock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${item.product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = Number(price) * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.product.name,
        variantName: item.variant.name,
        sku: item.variant.sku,
        price: Number(price),
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    // Get delivery fee
    const deliveryRule = await db.deliveryRule.findUnique({
      where: { region: validatedData.region },
    });

    let deliveryFee = 50; // Default fee
    if (deliveryRule) {
      deliveryFee = Number(deliveryRule.baseFee);
      if (deliveryRule.freeAbove && subtotal >= Number(deliveryRule.freeAbove)) {
        deliveryFee = 0;
      }
    }

    const total = subtotal + deliveryFee;

    // Create order
    const orderNumber = generateOrderNumber();
    const paymentReference = `PAY-${orderNumber}-${Date.now()}`;
    const idempotencyKey = uuidv4();

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: session?.userId,
        guestEmail: session?.userId ? undefined : validatedData.email,
        guestPhone: session?.userId ? undefined : validatedData.phone,
        status: "PENDING_PAYMENT",
        subtotal,
        deliveryFee,
        discount: 0,
        tax: 0,
        total,
        currency: "GHS",
        notes: validatedData.notes,
        shippingFirstName: validatedData.firstName,
        shippingLastName: validatedData.lastName,
        shippingPhone: validatedData.phone,
        shippingRegion: validatedData.region,
        shippingCity: validatedData.city,
        shippingLandmark: validatedData.landmark,
        shippingGpsCode: validatedData.gpsCode,
        items: {
          create: orderItems,
        },
        payments: {
          create: {
            provider: process.env.PAYMENTS_PROVIDER === "FLUTTERWAVE" ? "FLUTTERWAVE" : "HUBTEL",
            method: getPaymentMethodType(validatedData.paymentMethod),
            status: "PENDING",
            amount: total,
            currency: "GHS",
            reference: paymentReference,
            idempotencyKey,
          },
        },
        statusHistory: {
          create: {
            status: "PENDING_PAYMENT",
            note: "Order created, awaiting payment",
          },
        },
      },
      include: {
        items: true,
        payments: true,
      },
    });

    // Reserve stock
    for (const item of cart.items) {
      const stockLevel = item.variant.stockLevels[0];
      if (stockLevel) {
        await db.stockLevel.update({
          where: { id: stockLevel.id },
          data: { reserved: { increment: item.quantity } },
        });
      }
    }

    // Clear cart
    await db.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Create audit log
    if (session?.userId) {
      await createAuditLog({
        userId: session.userId,
        action: "CREATE",
        resource: "orders",
        resourceId: order.id,
        newData: { orderNumber, total },
      });
    }

    // For bank transfer, return order details directly
    if (validatedData.paymentMethod === "bank_transfer") {
      return NextResponse.json({
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        paymentMethod: "bank_transfer",
      });
    }

    // Initialize payment
    const paymentProvider = getPaymentProvider();
    const paymentResult = await paymentProvider.initializePayment({
      orderId: order.id,
      amount: total,
      currency: "GHS",
      customerEmail: validatedData.email,
      customerPhone: validatedData.momoNumber || validatedData.phone,
      customerName: `${validatedData.firstName} ${validatedData.lastName}`,
      description: `Order ${orderNumber}`,
      callbackUrl: `${process.env.APP_URL}/api/payments/webhook`,
      returnUrl: `${process.env.APP_URL}/order/success?id=${order.id}`,
      metadata: {
        orderId: order.id,
        orderNumber,
      },
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        { message: paymentResult.message || "Failed to initialize payment" },
        { status: 500 }
      );
    }

    // Update payment reference if different
    if (paymentResult.reference !== paymentReference) {
      await db.payment.update({
        where: { id: order.payments[0].id },
        data: { reference: paymentResult.reference },
      });
    }

    return NextResponse.json({
      id: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      checkoutUrl: paymentResult.checkoutUrl,
      reference: paymentResult.reference,
    });
  } catch (error) {
    console.error("Create order error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
