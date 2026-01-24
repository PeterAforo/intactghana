import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const removeFromCartSchema = z.object({
  itemId: z.string(),
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId } = removeFromCartSchema.parse(body);

    await db.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    console.error("Remove from cart error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
