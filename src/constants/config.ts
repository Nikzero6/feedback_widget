export const ROUTES = {
  home: "/",
  dashboard: {
    home: "/dashboard",
    login: "/dashboard/login",
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/api/public/auth/login",
    logout: "/api/public/auth/logout",
  },
  questions: {
    list: "/api/questions",
    create: "/api/questions",
    update: (id: string) => `/api/questions/${id}`,
    delete: (id: string) => `/api/questions/${id}`,
  },
  responses: {
    list: "/api/responses",
  },
  sse: "/api/sse",
} as const;

export const COOKIE_KEYS = {
  AUTH_TOKEN: "authToken",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
