import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;

    let cart = null;

    if (session?.userId) {
      cart = await db.cart.findFirst({
        where: { userId: session.userId },
        include: {
          items: {
            include: {
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
              variant: true,
            },
          },
        },
      });
    }

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({
        subtotal: 0,
        deliveryFee: 0,
        discount: 0,
        total: 0,
        itemCount: 0,
      });
    }

    const subtotal = cart.items.reduce((sum, item) => {
      const price = typeof item.variant.price === 'object' 
        ? Number(item.variant.price) 
        : item.variant.price;
      return sum + Number(price) * item.quantity;
    }, 0);

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    // Delivery fee calculation (simplified - will be calculated properly at checkout)
    const deliveryFee = subtotal >= 500 ? 0 : 20;

    // Discount (placeholder - would come from applied coupons)
    const discount = 0;

    const total = subtotal + deliveryFee - discount;

    return NextResponse.json({
      subtotal,
      deliveryFee,
      discount,
      total,
      itemCount,
    });
  } catch (error) {
    console.error("Get cart summary error:", error);
    return NextResponse.json(
      { message: "Failed to get cart summary" },
      { status: 500 }
    );
  }
}
