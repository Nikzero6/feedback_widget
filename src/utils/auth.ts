import { ROUTES } from "@/constants/config";

export const isProtectedRoute = (pathname: string): boolean => {
  // Dashboard routes (except login) require authentication
  if (pathname.startsWith("/dashboard")) {
    return pathname !== ROUTES.dashboard.login;
  }

  // API routes require authentication (except public routes)
  if (pathname.startsWith("/api")) {
    return !pathname.startsWith("/api/public");
  }

  // Add other protected routes here if needed
  return false;
};

export const isLoginRoute = (pathname: string): boolean => {
  return pathname === ROUTES.dashboard.login;
};

export const getLoginRedirectUrl = (): string => {
  return ROUTES.dashboard.login;
};
