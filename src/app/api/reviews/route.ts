import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { z } from "zod";

const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  content: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Please login to leave a review" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, rating, title, content } = createReviewSchema.parse(body);

    // Check if user has purchased this product
    const hasPurchased = await db.orderItem.findFirst({
      where: {
        order: {
          userId: session.userId,
          status: { in: ["DELIVERED", "COMPLETED"] },
        },
        product: { id: productId },
      },
    });

    // Check if user already reviewed this product
    const existingReview = await db.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: session.userId,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        productId,
        userId: session.userId,
        rating,
        title,
        content,
        isVerified: !!hasPurchased,
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Review submitted for moderation", review });
  } catch (error) {
    console.error("Create review error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create review" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;

    if (!productId) {
      return NextResponse.json({ message: "Product ID required" }, { status: 400 });
    }

    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where: { productId, status: "APPROVED" },
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.review.count({ where: { productId, status: "APPROVED" } }),
    ]);

    return NextResponse.json({
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ message: "Failed to get reviews" }, { status: 500 });
  }
}
