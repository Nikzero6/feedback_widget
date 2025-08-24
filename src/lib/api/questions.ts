import { API_ENDPOINTS, HTTP_STATUS } from "@/constants/config";
import { CreateQuestionRequest, UpdateQuestionRequest } from "@/types";
import { Question } from "@/types";

class QuestionsAPI {
  async fetchQuestions(): Promise<Question[]> {
    const response = await fetch(API_ENDPOINTS.questions.list, {
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    return response.json();
  }

  async createQuestion(data: CreateQuestionRequest): Promise<Question> {
    const response = await fetch(API_ENDPOINTS.questions.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.status === HTTP_STATUS.CREATED) {
      return response.json();
    }

    const error = await response
      .json()
      .catch(() => ({ error: "Failed to create question" }));

    throw new Error(error.error || "Failed to create question");
  }

  async updateQuestion(
    id: string,
    data: UpdateQuestionRequest
  ): Promise<Question> {
    const response = await fetch(API_ENDPOINTS.questions.update(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }

    const error = await response
      .json()
      .catch(() => ({ error: "Failed to update question" }));

    throw new Error(error.error || "Failed to update question");
  }

  async deleteQuestion(id: string): Promise<void> {
    const response = await fetch(API_ENDPOINTS.questions.delete(id), {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Failed to delete question" }));
      throw new Error(error.error || "Failed to delete question");
    }
  }
}

export const questionsAPI = new QuestionsAPI();
