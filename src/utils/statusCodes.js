export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const SUCCESS_MESSAGES = {
  API_WORKING: "API is working!",
  OPERATION_SUCCESSFUL: "Operation completed successfully",
  DATA_RETRIEVED: "Data retrieved successfully",
  DATA_CREATED: "Data created successfully",
  DATA_UPDATED: "Data updated successfully",
  DATA_DELETED: "Data deleted successfully",
};

export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation error",
  NOT_FOUND: "Resource not found",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  CONFLICT: "Resource conflict",
  BAD_REQUEST: "Bad request",
  DATABASE_ERROR: "Database operation failed",
};

// Alias for backwards compatibility
export const STATUS_CODES = HTTP_STATUS;
