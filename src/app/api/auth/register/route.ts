import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/lib/validations/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          ...(validatedData.phone ? [{ phone: validatedData.phone }] : []),
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or phone already exists" },
        { status: 400 }
      );
    }

    // Get customer role
    const customerRole = await db.role.findUnique({
      where: { name: "CUSTOMER" },
    });

    if (!customerRole) {
      return NextResponse.json(
        { message: "System error: Customer role not found" },
        { status: 500 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(validatedData.password);

    const user = await db.user.create({
      data: {
        email: validatedData.email,
        phone: validatedData.phone,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        roleId: customerRole.id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: "CREATE",
      resource: "users",
      resourceId: user.id,
      newData: { email: user.email, firstName: user.firstName, lastName: user.lastName },
    });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid input data", errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
