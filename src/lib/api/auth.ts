import { API_ENDPOINTS } from "@/constants/config";
import { LoginRequest, LoginResponse } from "@/types";

class AuthAPI {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include cookies
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return response.json();
    }

    const error = await response
      .json()
      .catch(() => ({ error: "Login failed" }));

    throw new Error(error.error || "Login failed");
  }

  async logout(): Promise<void> {
    const response = await fetch(API_ENDPOINTS.auth.logout, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  }
}

export const authAPI = new AuthAPI();
