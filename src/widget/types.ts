export interface WidgetConfig {
  // Positioning
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  offsetX: number;
  offsetY: number;

  // Theme & Colors
  theme: "light" | "dark" | "auto";
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;

  // Layout
  layout: "floating";
  width: string;
  height: string;

  // Content
  feedbackTitle: string;
  questionText: string;
  responseOptions: string[];
  showThankYou: boolean;
  thankYouMessage: string;

  // Behavior
  trigger: "click";
  autoHide: boolean;
  hideDelay: number;
}

export interface Question {
  id: string;
  text: string;
  type: "BOOLEAN" | "RATING" | "TEXT" | "CHOICES";
  options?: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Response {
  questionId: string;
  answer: string;
}

export interface PositionStyles {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
}

export interface WidgetElements {
  button: HTMLDivElement;
  popup: HTMLDivElement;
}

export type QuestionType = Question["type"];
export type WidgetPosition = WidgetConfig["position"];
export type WidgetTheme = WidgetConfig["theme"];
