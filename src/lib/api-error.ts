export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "LOCKED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TOO_MANY_ATTEMPTS"
  | "INTERNAL_ERROR";

const statusByCode: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  LOCKED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_ATTEMPTS: 429,
  INTERNAL_ERROR: 500,
};

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiErrorResponse(error: unknown): Response {
  const apiError =
    error instanceof ApiError
      ? error
      : new ApiError("INTERNAL_ERROR", "An unexpected error occurred.");

  return Response.json(
    {
      error: {
        code: apiError.code,
        message: apiError.message,
        ...(apiError.details ? { details: apiError.details } : {}),
      },
    },
    { status: statusByCode[apiError.code] },
  );
}
