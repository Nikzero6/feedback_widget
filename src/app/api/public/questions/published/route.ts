import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch only published questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      where: { isPublished: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching published questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
