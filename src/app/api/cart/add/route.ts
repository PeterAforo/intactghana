import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive().default(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, variantId, quantity } = addToCartSchema.parse(body);

    const session = await getSession();
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("cart_session")?.value;

    if (!sessionId && !session) {
      sessionId = crypto.randomUUID();
      cookieStore.set("cart_session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Verify product and variant exist
    const variant = await db.variant.findUnique({
      where: { id: variantId },
      include: {
        product: true,
        stockLevels: true,
      },
    });

    if (!variant || variant.productId !== productId) {
      return NextResponse.json(
        { message: "Product or variant not found" },
        { status: 404 }
      );
    }

    // Check stock
    const availableStock = variant.stockLevels.reduce(
      (sum, sl) => sum + sl.quantity - sl.reserved,
      0
    );

    if (availableStock < quantity) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Get or create cart
    let cart = session?.userId
      ? await db.cart.findFirst({ where: { userId: session.userId } })
      : await db.cart.findUnique({ where: { sessionId: sessionId! } });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session?.userId,
          sessionId: session?.userId ? undefined : sessionId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Check if item already in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Add new item
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
        },
      });
    }

    return NextResponse.json({ message: "Added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
