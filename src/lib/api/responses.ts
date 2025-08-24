import { API_ENDPOINTS } from "@/constants/config";
import { Response } from "@/types";

class ResponsesAPI {
  async fetchResponses(): Promise<Response[]> {
    const response = await fetch(API_ENDPOINTS.responses.list, {
      credentials: "include", // Include cookies for admin authentication
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch responses: ${response.statusText}`);
    }

    return response.json();
  }
}

export const responsesAPI = new ResponsesAPI();
