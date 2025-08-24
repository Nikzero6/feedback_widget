import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";
import { generateToken } from "@/lib/auth";
import { COOKIE_KEYS } from "@/constants/config";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // verify credentials of the admin user
    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({ username });

    // Create response with user data
    const response = NextResponse.json(
      {
        user: { username },
        message: "Login successful",
      },
      { status: 200 }
    );

    // Set HTTP-only cookie with JWT token
    response.cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, {
      httpOnly: true,
      secure: false, // secure will not work for localhost
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
