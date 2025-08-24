import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all responses
export async function GET() {
  try {
    const responses = await prisma.response.findMany({
      include: {
        question: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    return NextResponse.json(
      { error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
}
