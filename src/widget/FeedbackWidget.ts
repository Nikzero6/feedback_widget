import { WidgetConfig, Question, Response, WidgetElements } from "./types.js";
import { DEFAULT_CONFIG } from "./config.js";
import { WidgetStyles } from "./styles.js";
import { PositionManager } from "./position.js";
import { QuestionRenderer } from "./questionRenderer.js";
import { WidgetAPI } from "./api.js";
import { WidgetStorage } from "./storage.js";

export class FeedbackWidget {
  private config: WidgetConfig;
  private elements!: WidgetElements;
  private api: WidgetAPI;
  private isOpen: boolean = false;
  private questions: Question[] = [];
  private currentQuestionIndex: number = 0;
  private answers: Map<string, string> = new Map();

  constructor(config: Partial<WidgetConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.api = new WidgetAPI("/api/public");
    this.init();
  }

  private init(): void {
    this.injectStyles();
    this.createWidget();
    this.setupEventListeners();
    this.applyTheme();
  }

  private injectStyles(): void {
    WidgetStyles.getInstance().inject();
  }

  private createWidget(): void {
    // Create floating button
    this.elements = {
      button: document.createElement("div"),
      popup: document.createElement("div"),
    };

    this.elements.button.className = "feedback-widget feedback-widget-button";
    this.elements.button.innerHTML = "💬";

    const buttonStyles = PositionManager.getPositionStyles(
      this.config.position,
      this.config.offsetX,
      this.config.offsetY
    );
    this.elements.button.style.cssText = `
      background: linear-gradient(135deg, ${this.config.primaryColor}, ${
      this.config.secondaryColor
    });
      ${PositionManager.positionStylesToString(buttonStyles)}
    `;

    // Create popup
    this.elements.popup.className = "feedback-widget feedback-widget-popup";
    this.elements.popup.style.cssText = `
      min-width: min(${this.config.width}, 90vw);
      min-height: min(${this.config.height}, 90vh);
    `;

    // Create popup content
    this.elements.popup.innerHTML = `
      <button class="feedback-widget-close" aria-label="Close">×</button>
      <div class="feedback-widget-header">
        <h3 class="feedback-widget-title">${this.config.feedbackTitle}</h3>
      </div>
      <div class="feedback-widget-body">
        ${QuestionRenderer.renderLoading()}
      </div>
    `;

    // Add to DOM
    document.body.appendChild(this.elements.button);
    document.body.appendChild(this.elements.popup);
  }

  private applyTheme(): void {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", this.config.primaryColor);
    root.style.setProperty("--secondary-color", this.config.secondaryColor);
    root.style.setProperty("--background-color", this.config.backgroundColor);
    root.style.setProperty("--text-color", this.config.textColor);
  }

  private async loadQuestions(): Promise<void> {
    try {
      this.questions = await this.api.fetchPublishedQuestions();
      // Filter out already submitted questions
      this.questions = this.questions.filter(
        (q) => !WidgetStorage.isQuestionSubmitted(q.id)
      );
      this.updatePopupContent();
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  }

  private updatePopupContent(): void {
    const body = this.elements.popup.querySelector(".feedback-widget-body");
    if (body) {
      body.innerHTML = QuestionRenderer.renderQuestionsList(
        this.questions,
        this.currentQuestionIndex
      );
    }
  }

  private setupEventListeners(): void {
    // Button click
    this.elements.button.addEventListener("click", () => this.togglePopup());

    // Close button
    this.elements.popup.addEventListener("click", (e) => {
      if ((e.target as Element).classList.contains("feedback-widget-close")) {
        this.closePopup();
      }
    });

    // Navigation buttons
    this.elements.popup.addEventListener("click", (e) => {
      const target = e.target as Element;
      if (target.classList.contains("feedback-widget-nav-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const action = target.getAttribute("data-action");
        if (action === "prev") {
          this.previousQuestion();
        } else if (action === "next") {
          this.nextQuestion();
        }
      }
    });

    // Submit button
    this.elements.popup.addEventListener("click", (e) => {
      if ((e.target as Element).classList.contains("feedback-widget-submit")) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSubmit();
      }
    });

    // Option selection
    this.elements.popup.addEventListener("click", (e) => {
      if ((e.target as Element).classList.contains("feedback-widget-option")) {
        e.preventDefault();
        e.stopPropagation();
        this.selectOption(e.target as HTMLButtonElement);
      }
    });

    // Star rating
    this.elements.popup.addEventListener("click", (e) => {
      if ((e.target as Element).classList.contains("feedback-widget-star")) {
        e.preventDefault();
        e.stopPropagation();
        this.selectRating(e.target as HTMLSpanElement);
      }
    });

    // Text input changes
    this.elements.popup.addEventListener("input", (e) => {
      const target = e.target as Element;
      if (target.classList.contains("feedback-widget-textarea")) {
        this.handleTextInput(target as HTMLTextAreaElement);
      }
    });

    // Close on outside click - but not when clicking inside the popup
    document.addEventListener("click", (e) => {
      if (
        !this.elements.popup.contains(e.target as Node) &&
        !this.elements.button.contains(e.target as Node) &&
        this.isOpen
      ) {
        this.closePopup();
      }
    });
  }

  private togglePopup(): void {
    if (this.isOpen) {
      this.closePopup();
    } else {
      this.openPopup();
    }
  }

  private openPopup(): void {
    this.isOpen = true;
    this.elements.popup.classList.add("open");
    this.elements.button.style.display = "none";
    this.loadQuestions();
  }

  private closePopup(): void {
    this.isOpen = false;
    this.elements.popup.classList.remove("open");
    this.elements.button.style.display = "flex";

    // Reset the widget state
    setTimeout(() => {
      this.reset();
    }, this.config.hideDelay);
  }

  private selectOption(optionElement: HTMLButtonElement): void {
    // Remove previous selection for current question
    this.elements.popup
      .querySelectorAll(".feedback-widget-option")
      .forEach((opt) => {
        opt.classList.remove("selected");
      });

    // Select current option
    optionElement.classList.add("selected");

    // Store the answer
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      this.answers.set(currentQuestion.id, optionElement.dataset.value || "");
    }

    // Enable navigation or submit button
    this.updateNavigationState();
  }

  private selectRating(starElement: HTMLSpanElement): void {
    const rating = parseInt(starElement.dataset.value || "0");

    // Update star display
    this.elements.popup
      .querySelectorAll(".feedback-widget-star")
      .forEach((star, index) => {
        if (index < rating) {
          star.classList.add("active");
        } else {
          star.classList.remove("active");
        }
      });

    // Store the answer
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      this.answers.set(currentQuestion.id, rating.toString());
    }

    // Enable navigation or submit button
    this.updateNavigationState();
  }

  private handleTextInput(textareaElement: HTMLTextAreaElement): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      const textValue = textareaElement.value.trim();
      if (textValue) {
        this.answers.set(currentQuestion.id, textValue);
      } else {
        this.answers.delete(currentQuestion.id);
      }
      this.updateNavigationState();
    }
  }

  private updateNavigationState(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (!currentQuestion) return;

    const hasAnswer = this.answers.has(currentQuestion.id);
    const nextBtn = this.elements.popup.querySelector(
      ".feedback-widget-nav-btn[data-action='next']"
    ) as HTMLButtonElement;
    const submitBtn = this.elements.popup.querySelector(
      ".feedback-widget-submit"
    ) as HTMLButtonElement;

    if (nextBtn) {
      nextBtn.disabled = !hasAnswer;
    }

    if (submitBtn) {
      submitBtn.disabled = !hasAnswer;
    }
  }

  private previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updatePopupContent();
      this.updateNavigationState();
    }
  }

  private nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updatePopupContent();
      this.updateNavigationState();
    }
  }

  private async handleSubmit(): Promise<void> {
    if (this.answers.size === 0) return;

    try {
      // Submit all answers
      const responses: Response[] = Array.from(this.answers.entries()).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      await this.api.submitResponses(responses);

      // Track submitted questions in localStorage
      const submittedQuestionIds = Array.from(this.answers.keys());
      WidgetStorage.addSubmittedQuestions(submittedQuestionIds);

      this.showThankYou();
    } catch (error) {
      console.error("Failed to submit responses:", error);
    }
  }

  private showThankYou(): void {
    const body = this.elements.popup.querySelector(".feedback-widget-body");
    if (body) {
      body.innerHTML = QuestionRenderer.renderThankYou(
        this.config.thankYouMessage
      );
    }

    if (this.config.autoHide) {
      setTimeout(() => {
        this.closePopup();
      }, this.config.hideDelay);
    }
  }

  // Public methods for external control
  open(): void {
    this.openPopup();
  }

  close(): void {
    this.closePopup();
  }

  destroy(): void {
    if (this.elements.button.parentNode) {
      this.elements.button.parentNode.removeChild(this.elements.button);
    }
    if (this.elements.popup.parentNode) {
      this.elements.popup.parentNode.removeChild(this.elements.popup);
    }
  }

  updateConfig(newConfig: Partial<WidgetConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.applyTheme();

    // Update header title if feedbackTitle changed
    const header = this.elements.popup.querySelector(
      ".feedback-widget-header h3"
    );
    if (header) {
      header.textContent = this.config.feedbackTitle;
    }

    // Update button position if position changed
    const buttonStyles = PositionManager.getPositionStyles(
      this.config.position,
      this.config.offsetX,
      this.config.offsetY
    );
    this.elements.button.style.cssText = `
      background: linear-gradient(135deg, ${this.config.primaryColor}, ${
      this.config.secondaryColor
    });
      ${PositionManager.positionStylesToString(buttonStyles)}
    `;
  }

  // Method to get current answers (useful for debugging or external access)
  getAnswers(): Map<string, string> {
    return new Map(this.answers);
  }

  // Method to reset the widget state
  reset(): void {
    this.currentQuestionIndex = 0;
    this.answers.clear();
    this.updatePopupContent();
    this.updateNavigationState();
  }

  // Method to check if questions are available
  hasQuestions(): boolean {
    return this.questions.length > 0;
  }

  // Method to get submitted questions count
  getSubmittedCount(): number {
    return WidgetStorage.getSubmittedCount();
  }

  // Method to get submitted questions (for testing purposes)
  getSubmittedQuestions(): Set<string> {
    return WidgetStorage.getSubmittedQuestions();
  }

  // Method to clear submitted questions (useful for testing or admin purposes)
  clearSubmittedQuestions(): void {
    WidgetStorage.clearSubmittedQuestions();
    // Reload questions to show previously submitted ones
    this.loadQuestions();
  }
}
