import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { hasPermission, RESOURCES, ACTIONS } from "@/lib/rbac";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const canModerate = await hasPermission(session.userId, RESOURCES.REVIEWS, ACTIONS.UPDATE);
    if (!canModerate) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await db.review.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return NextResponse.redirect(new URL("/admin/reviews", request.url));
  } catch (error) {
    console.error("Approve review error:", error);
    return NextResponse.json({ message: "Failed to approve review" }, { status: 500 });
  }
}
