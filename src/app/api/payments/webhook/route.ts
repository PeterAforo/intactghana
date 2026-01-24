import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getPaymentProvider } from "@/lib/payments";
import { sendOrderConfirmationSMS, sendOrderConfirmationEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-flutterwave-signature") || 
                      request.headers.get("x-hubtel-signature") || "";

    const provider = getPaymentProvider();

    // Verify webhook signature
    if (!provider.verifyWebhookSignature(payload, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const webhookData = provider.parseWebhookData(JSON.parse(payload));

    // Find payment by reference
    const payment = await db.payment.findUnique({
      where: { reference: webhookData.reference },
      include: {
        order: {
          include: {
            user: true,
            items: true,
          },
        },
      },
    });

    if (!payment) {
      console.error("Payment not found:", webhookData.reference);
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    // Check idempotency - if already processed, return success
    if (payment.status === "SUCCESS") {
      return NextResponse.json({ message: "Already processed" });
    }

    // Update payment status
    const isSuccess = webhookData.status.toLowerCase() === "success" || 
                      webhookData.status.toLowerCase() === "successful";

    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: isSuccess ? "SUCCESS" : "FAILED",
        providerRef: webhookData.providerRef,
        paidAt: isSuccess ? new Date() : undefined,
      },
    });

    if (isSuccess) {
      // Update order status
      await db.order.update({
        where: { id: payment.orderId },
        data: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      // Add status history
      await db.orderStatusHistory.create({
        data: {
          orderId: payment.orderId,
          status: "PAID",
          note: `Payment received via ${payment.method}`,
        },
      });

      // Convert reserved stock to actual deduction
      for (const item of payment.order.items) {
        const stockLevel = await db.stockLevel.findFirst({
          where: { variantId: item.variantId },
        });

        if (stockLevel) {
          await db.stockLevel.update({
            where: { id: stockLevel.id },
            data: {
              quantity: { decrement: item.quantity },
              reserved: { decrement: item.quantity },
            },
          });
        }
      }

      // Send notifications
      const customerEmail = payment.order.user?.email || payment.order.guestEmail;
      const customerPhone = payment.order.user?.phone || payment.order.guestPhone;

      if (customerEmail) {
        await sendOrderConfirmationEmail({
          to: customerEmail,
          orderNumber: payment.order.orderNumber,
          total: Number(payment.order.total),
          items: payment.order.items,
        });
      }

      if (customerPhone) {
        await sendOrderConfirmationSMS({
          to: customerPhone,
          orderNumber: payment.order.orderNumber,
          total: Number(payment.order.total),
        });
      }
    } else {
      // Payment failed - release reserved stock
      for (const item of payment.order.items) {
        const stockLevel = await db.stockLevel.findFirst({
          where: { variantId: item.variantId },
        });

        if (stockLevel) {
          await db.stockLevel.update({
            where: { id: stockLevel.id },
            data: {
              reserved: { decrement: item.quantity },
            },
          });
        }
      }

      // Update order status
      await db.order.update({
        where: { id: payment.orderId },
        data: { status: "CANCELLED" },
      });

      await db.orderStatusHistory.create({
        data: {
          orderId: payment.orderId,
          status: "CANCELLED",
          note: "Payment failed",
        },
      });
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
