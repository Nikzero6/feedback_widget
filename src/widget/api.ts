import { Question, Response } from "./types.js";

export class WidgetAPI {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  async fetchPublishedQuestions(): Promise<Question[]> {
    try {
      const response = await fetch(`${this.baseUrl}/questions/published`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    } catch (error) {
      console.error("Failed to load questions:", error);
      throw error;
    }
  }

  async submitResponses(responses: Response[]): Promise<boolean> {
    try {
      const apiResponse = await fetch(`${this.baseUrl}/responses/multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      if (apiResponse.ok) {
        return true;
      }
      throw new Error(`Failed to submit response: ${apiResponse.statusText}`);
    } catch (error) {
      console.error("Failed to submit response:", error);
      throw error;
    }
  }
}
