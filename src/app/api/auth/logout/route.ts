import { NextResponse } from "next/server";
import { clearSessionCookies, getSession } from "@/lib/auth/session";
import { createAuditLog } from "@/lib/audit";

export async function POST() {
  try {
    const session = await getSession();

    if (session) {
      await createAuditLog({
        userId: session.userId,
        action: "LOGOUT",
        resource: "auth",
        resourceId: session.userId,
      });
    }

    await clearSessionCookies();

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
