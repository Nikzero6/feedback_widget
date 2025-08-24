import { NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/constants/config";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set(COOKIE_KEYS.AUTH_TOKEN, "", {
      httpOnly: true,
      secure: false, // secure will not work for localhost
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
