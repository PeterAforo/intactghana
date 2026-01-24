import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateCartSchema = z.object({
  itemId: z.string(),
  quantity: z.number().int().positive(),
});

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, quantity } = updateCartSchema.parse(body);

    const cartItem = await db.cartItem.findUnique({
      where: { id: itemId },
      include: {
        variant: {
          include: {
            stockLevels: true,
          },
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    // Check stock
    const availableStock = cartItem.variant.stockLevels.reduce(
      (sum, sl) => sum + sl.quantity - sl.reserved,
      0
    );

    if (availableStock < quantity) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 }
      );
    }

    await db.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({ message: "Cart updated" });
  } catch (error) {
    console.error("Update cart error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update cart" },
      { status: 500 }
    );
  }
}
