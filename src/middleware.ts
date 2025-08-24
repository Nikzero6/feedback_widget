import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { COOKIE_KEYS, ROUTES } from "./constants/config";
import {
  isProtectedRoute,
  getLoginRedirectUrl,
  isLoginRoute,
} from "./utils/auth";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route requires authentication
  if (isProtectedRoute(pathname)) {
    // Extract the authentication token from cookies
    const authToken = request.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value;

    // If no token is found, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL(getLoginRedirectUrl(), request.url));
    }

    try {
      // Verify the JWT token to ensure it's valid and not expired
      const payload = verifyToken(authToken);

      if (!payload) {
        // Token is invalid or expired, redirect to login
        return NextResponse.redirect(
          new URL(getLoginRedirectUrl(), request.url)
        );
      }

      // Token is valid, allow access to the protected route
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification error:", error);
      // If token verification fails for any reason, redirect to login
      return NextResponse.redirect(new URL(getLoginRedirectUrl(), request.url));
    }
  }

  // Handle login route redirects for already authenticated users
  // This prevents authenticated users from accessing the login page
  else if (isLoginRoute(pathname)) {
    const authToken = request.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value;

    if (authToken) {
      const payload = verifyToken(authToken);

      if (payload) {
        // User is already authenticated, redirect to dashboard
        return NextResponse.redirect(
          new URL(ROUTES.dashboard.home, request.url)
        );
      }
    }
  }

  // For non-protected routes, allow normal access
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    // do not apply middleware to these paths
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
