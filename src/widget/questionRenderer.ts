import { Question } from "./types";

export class QuestionRenderer {
  static renderQuestionsList(
    questions: Question[],
    currentIndex: number = 0
  ): string {
    if (questions.length === 0) {
      return this.renderNoQuestions();
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    return `
      <div class="feedback-widget-progress">
        <div class="feedback-widget-progress-bar">
          <div class="feedback-widget-progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="feedback-widget-progress-text">Question ${
          currentIndex + 1
        } of ${totalQuestions}</div>
      </div>
      
      <div class="feedback-widget-question">
        <h4 class="feedback-widget-question-title">${currentQuestion.text}</h4>
        ${this.renderQuestionContent(currentQuestion)}
      </div>
      
      <div class="feedback-widget-navigation">
        ${
          currentIndex > 0
            ? '<button class="feedback-widget-nav-btn feedback-widget-prev" data-action="prev">← Previous</button>'
            : ""
        }
        ${
          currentIndex < totalQuestions - 1
            ? '<button class="feedback-widget-nav-btn feedback-widget-next" data-action="next" disabled>Next →</button>'
            : ""
        }
        ${
          currentIndex === totalQuestions - 1
            ? '<button class="feedback-widget-submit" disabled>Submit All</button>'
            : ""
        }
      </div>
    `;
  }

  static renderQuestionContent(question: Question): string {
    switch (question.type) {
      case "BOOLEAN":
        return this.renderBooleanQuestion();
      case "RATING":
        return this.renderRatingQuestion();
      case "TEXT":
        return this.renderTextQuestion();
      case "CHOICES":
        return this.renderChoicesQuestion(question.options || []);
      default:
        return "<p>Question type not supported</p>";
    }
  }

  private static renderBooleanQuestion(): string {
    return `
      <div class="feedback-widget-options">
        <button class="feedback-widget-option" data-value="Yes">Yes</button>
        <button class="feedback-widget-option" data-value="No">No</button>
      </div>
    `;
  }

  private static renderRatingQuestion(): string {
    const stars = [1, 2, 3, 4, 5]
      .map(
        (num) =>
          `<span class="feedback-widget-star" data-value="${num}">⭐</span>`
      )
      .join("");

    return `
      <div class="feedback-widget-rating">
        ${stars}
      </div>
    `;
  }

  private static renderTextQuestion(): string {
    return `
      <textarea class="feedback-widget-textarea" placeholder="Please share your feedback..." data-question-input="true"></textarea>
    `;
  }

  private static renderChoicesQuestion(options: string[]): string {
    const optionButtons = options
      .map(
        (option) =>
          `<button class="feedback-widget-option" data-value="${option}">${option}</button>`
      )
      .join("");

    return `
      <div class="feedback-widget-options">
        ${optionButtons}
      </div>
    `;
  }

  static renderThankYou(message: string): string {
    return `
      <div class="feedback-widget-thankyou">
        <h3>Thank you!</h3>
        <p>${message}</p>
      </div>
    `;
  }

  static renderLoading(): string {
    return `
      <div class="feedback-widget-loading">
        Loading questions...
      </div>
    `;
  }

  private static renderNoQuestions(): string {
    return `
      <div class="feedback-widget-no-questions">
        <p>No questions available at the moment.</p>
        <p>Please check back later!</p>
      </div>
    `;
  }
}
