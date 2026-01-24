import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { processUserMessage } from "@/lib/ai/assistant";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = chatSchema.parse(body);

    const session = await getSession();
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("ai_session")?.value;

    if (!sessionId && !session) {
      sessionId = crypto.randomUUID();
      cookieStore.set("ai_session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    const response = await processUserMessage(
      message,
      history,
      sessionId,
      session?.userId
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI chat error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: "I'm having trouble processing your request. Please try again or contact our support team.",
        actions: [],
        shouldEscalate: true,
      },
      { status: 500 }
    );
  }
}
