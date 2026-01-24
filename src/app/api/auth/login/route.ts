import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { setSessionCookies } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validations/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await db.user.findUnique({
      where: { email: validatedData.email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: "Your account has been deactivated" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role.name,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    // Set cookies
    await setSessionCookies(accessToken, refreshToken);

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: "LOGIN",
      resource: "auth",
      resourceId: user.id,
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
