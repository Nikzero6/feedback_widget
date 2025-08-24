export enum QuestionType {
  BOOLEAN = "BOOLEAN",
  RATING = "RATING",
  TEXT = "TEXT",
  CHOICES = "CHOICES",
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Response {
  id: string;
  questionId: string;
  answer: string;
  metadata?: {
    ip: string;
    userAgent: string;
    timestamp: string;
  };
  question: Question;
  createdAt: string;
}

export interface WidgetConfig {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  offsetX: number;
  offsetY: number;
  theme: "light" | "dark" | "auto";
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  layout: "floating";
  width: string;
  height: string;
  trigger: "click";
  autoHide: boolean;
  hideDelay: number;
}

export interface CreateQuestionRequest {
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface CreateResponseRequest {
  questionId: string;
  answer: string;
}

export interface UpdateQuestionRequest {
  text?: string;
  type?: QuestionType;
  options?: string[];
  isPublished?: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
