import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { hasPermission, RESOURCES, ACTIONS } from "@/lib/rbac";
import { createAuditLog } from "@/lib/audit";
import { sendOrderShippedSMS, sendOrderDeliveredSMS } from "@/lib/notifications";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum([
    "PENDING_PAYMENT",
    "PAID",
    "PROCESSING",
    "PACKED",
    "DISPATCHED",
    "DELIVERED",
    "COMPLETED",
    "CANCELLED",
    "REFUNDED",
  ]),
  note: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const canUpdate = await hasPermission(session.userId, RESOURCES.ORDERS, ACTIONS.UPDATE);
    if (!canUpdate) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, note } = updateStatusSchema.parse(body);

    const order = await db.order.findUnique({
      where: { id },
      include: {
        user: { select: { phone: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const oldStatus = order.status;

    // Update order status
    const updateData: Record<string, unknown> = { status };

    if (status === "DISPATCHED" && !order.shippedAt) {
      updateData.shippedAt = new Date();
    }
    if (status === "DELIVERED" && !order.deliveredAt) {
      updateData.deliveredAt = new Date();
    }
    if (status === "CANCELLED" && !order.cancelledAt) {
      updateData.cancelledAt = new Date();
    }

    await db.order.update({
      where: { id },
      data: updateData,
    });

    // Add status history
    await db.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        note,
        createdBy: session.userId,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: session.userId,
      action: "UPDATE",
      resource: "orders",
      resourceId: id,
      oldData: { status: oldStatus },
      newData: { status },
    });

    // Send notifications
    const customerPhone = order.user?.phone || order.guestPhone;

    if (customerPhone) {
      if (status === "DISPATCHED") {
        await sendOrderShippedSMS({
          to: customerPhone,
          orderNumber: order.orderNumber,
        });
      } else if (status === "DELIVERED") {
        await sendOrderDeliveredSMS({
          to: customerPhone,
          orderNumber: order.orderNumber,
        });
      }
    }

    // Handle stock for cancellation
    if (status === "CANCELLED" && oldStatus !== "CANCELLED") {
      const orderItems = await db.orderItem.findMany({
        where: { orderId: id },
      });

      for (const item of orderItems) {
        const stockLevel = await db.stockLevel.findFirst({
          where: { variantId: item.variantId },
        });

        if (stockLevel) {
          // If order was paid, restore quantity; if not, just release reservation
          if (order.paidAt) {
            await db.stockLevel.update({
              where: { id: stockLevel.id },
              data: { quantity: { increment: item.quantity } },
            });
          } else {
            await db.stockLevel.update({
              where: { id: stockLevel.id },
              data: { reserved: { decrement: item.quantity } },
            });
          }
        }
      }
    }

    return NextResponse.json({ message: "Status updated" });
  } catch (error) {
    console.error("Update order status error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}
