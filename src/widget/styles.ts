export class WidgetStyles {
  private static instance: WidgetStyles;
  private styleId = "feedback-widget-styles";

  private constructor() {}

  static getInstance(): WidgetStyles {
    if (!WidgetStyles.instance) {
      WidgetStyles.instance = new WidgetStyles();
    }
    return WidgetStyles.instance;
  }

  inject(): void {
    if (document.getElementById(this.styleId)) return;

    const style = document.createElement("style");
    style.id = this.styleId;
    style.textContent = this.getStyles();
    document.head.appendChild(style);
  }

  private getStyles(): string {
    return `
      .feedback-widget {
        position: fixed;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
      }

      .feedback-widget-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        color: white;
      }

      .feedback-widget-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      .feedback-widget-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        background: var(--background-color);
        z-index: 999999;
      }

      .feedback-widget-popup.open {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        visibility: visible;
      }

      .feedback-widget-popup * {
        pointer-events: auto;
      }

      .feedback-widget-header {
        padding: 24px 24px 16px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
      }

      .feedback-widget-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
      }

      .feedback-widget-body {
        padding: 24px;
        background: var(--background-color);
        color: var(--text-color);
        height: 100%;
      }

      .feedback-widget-progress {
        margin-bottom: 24px;
      }

      .feedback-widget-progress-bar {
        width: 100%;
        height: 6px;
        background: #e2e8f0;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .feedback-widget-progress-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        transition: width 0.3s ease;
      }

      .feedback-widget-progress-text {
        font-size: 14px;
        color: #64748b;
        text-align: center;
      }

      .feedback-widget-question {
        margin-bottom: 24px;
      }

      .feedback-widget-question-title {
        margin: 0 0 20px;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.4;
        color: var(--text-color);
      }

      .feedback-widget-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }

      .feedback-widget-option {
        padding: 16px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 16px;
        text-align: left;
      }

      .feedback-widget-option:hover {
        border-color: var(--primary-color);
        background: #f8fafc;
      }

      .feedback-widget-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
      }

      .feedback-widget-rating {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 24px;
      }

      .feedback-widget-star {
        font-size: 32px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #e2e8f0;
      }

      .feedback-widget-star:hover,
      .feedback-widget-star.active {
        color: #fbbf24;
        transform: scale(1.2);
        filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5));
      }

      .feedback-widget-textarea {
        width: 100%;
        min-height: 120px;
        padding: 16px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 16px;
        font-family: inherit;
        resize: vertical;
        box-sizing: border-box;
        margin-bottom: 24px;
      }

      .feedback-widget-textarea:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .feedback-widget-navigation {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        align-items: center;
      }

      .feedback-widget-nav-btn {
        padding: 12px 20px;
        border: 2px solid var(--primary-color);
        background: transparent;
        color: var(--primary-color);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .feedback-widget-nav-btn:hover:not(:disabled) {
        background: var(--primary-color);
        color: white;
      }

      .feedback-widget-nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .feedback-widget-submit {
        padding: 16px 24px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        flex: 1;
      }

      .feedback-widget-submit:hover:not(:disabled) {
        background: var(--secondary-color);
        transform: translateY(-2px);
      }

      .feedback-widget-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .feedback-widget-thankyou {
        text-align: center;
        padding: 40px 24px;
      }

      .feedback-widget-thankyou h3 {
        margin: 0 0 16px;
        font-size: 24px;
        color: var(--primary-color);
      }

      .feedback-widget-thankyou p {
        margin: 0;
        font-size: 16px;
        color: var(--text-color);
      }

      .feedback-widget-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.2s ease;
      }

      .feedback-widget-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .feedback-widget-loading {
        text-align: center;
        padding: 40px 24px;
        color: var(--text-color);
      }

      .feedback-widget-no-questions {
        text-align: center;
        padding: 40px 24px;
        color: var(--text-color);
      }

      .feedback-widget-no-questions p {
        margin: 8px 0;
        color: #64748b;
      }

      @media (max-width: 480px) {
        .feedback-widget-popup {
          width: 90vw !important;
          height: auto !important;
          max-height: 80vh;
        }
        
        .feedback-widget-navigation {
          flex-direction: column;
          gap: 8px;
        }
        
        .feedback-widget-nav-btn,
        .feedback-widget-submit {
          width: 100%;
        }
      }
    `;
  }
}
