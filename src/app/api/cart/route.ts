import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

async function getOrCreateCart(userId?: string, sessionId?: string) {
  let cart = null;

  if (userId) {
    cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
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
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
          },
        },
      },
    });
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId,
        sessionId: userId ? undefined : sessionId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
          },
        },
      },
    });
  }

  return cart;
}

export async function GET() {
  try {
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

    const cart = await getOrCreateCart(session?.userId, sessionId);

    const items = cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        brand: item.product.brand,
        images: item.product.images,
      },
      variant: {
        id: item.variant.id,
        name: item.variant.name,
        sku: item.variant.sku,
        price: Number(item.variant.price),
      },
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { message: "Failed to get cart" },
      { status: 500 }
    );
  }
}
