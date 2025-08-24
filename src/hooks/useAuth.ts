"use client";

import { useCallback } from "react";
import { authAPI } from "@/lib/api/auth";
import { LoginRequest } from "@/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/config";

export const useAuth = () => {
  const router = useRouter();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      await authAPI.login(credentials);
      router.refresh();
    },
    [router]
  );

  const logout = useCallback(async () => {
    await authAPI.logout();
    router.push(ROUTES.home);
  }, [router]);

  return {
    login,
    logout,
  };
};
