import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { broadcastSSE } from "@/lib/sse-manager";

export async function POST(request: NextRequest) {
  try {
    const { responses } = await request.json();

    if (!responses) {
      return NextResponse.json(
        { error: "Answers are required" },
        { status: 400 }
      );
    }

    // Get client metadata
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Use a transaction to create responses and then fetch them for broadcasting
    const result = await prisma.$transaction(async (tx) => {
      const createdResponses = await tx.response.createManyAndReturn({
        data: responses.map(
          (response: { questionId: string; answer: string }) => ({
            questionId: response.questionId,
            answer: response.answer,
            metadata: {
              ip,
              userAgent,
              timestamp: new Date().toISOString(),
            },
          })
        ),
        include: {
          question: true,
        },
      });

      return { createdResponses };
    });

    // Broadcast new responses to connected SSE clients
    result.createdResponses.forEach((response) => {
      broadcastSSE({
        type: "new_response",
        data: response,
        timestamp: Date.now(),
      });
    });

    return NextResponse.json(
      { count: result.createdResponses.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating multiple responses:", error);
    return NextResponse.json(
      { error: "Failed to create multiple responses" },
      { status: 500 }
    );
  }
}
