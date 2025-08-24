export class WidgetStorage {
  private static readonly STORAGE_KEY = "feedback_widget_submitted_questions";

  static getSubmittedQuestions(): Set<string> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const questionIds = JSON.parse(stored);
        return new Set(Array.isArray(questionIds) ? questionIds : []);
      }
    } catch (error) {
      console.warn(
        "Failed to parse submitted questions from localStorage:",
        error
      );
    }
    return new Set();
  }

  static addSubmittedQuestion(questionId: string): void {
    try {
      const submitted = this.getSubmittedQuestions();
      submitted.add(questionId);
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(Array.from(submitted))
      );
    } catch (error) {
      console.warn("Failed to save submitted question to localStorage:", error);
    }
  }

  static addSubmittedQuestions(questionIds: string[]): void {
    try {
      const submitted = this.getSubmittedQuestions();
      questionIds.forEach((id) => submitted.add(id));
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(Array.from(submitted))
      );
    } catch (error) {
      console.warn(
        "Failed to save submitted questions to localStorage:",
        error
      );
    }
  }

  static isQuestionSubmitted(questionId: string): boolean {
    return this.getSubmittedQuestions().has(questionId);
  }

  static clearSubmittedQuestions(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn(
        "Failed to clear submitted questions from localStorage:",
        error
      );
    }
  }

  static getSubmittedCount(): number {
    return this.getSubmittedQuestions().size;
  }
}
