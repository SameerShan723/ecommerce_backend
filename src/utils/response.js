import { HTTP_STATUS, SUCCESS_MESSAGES } from "./statusCodes.js";

export const successResponse = (
  res,
  data = null,
  message = SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
  statusCode = HTTP_STATUS.OK
) => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data }),
  };

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res,
  message = "An error occurred",
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors = null
) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(response);
};

export const paginatedResponse = (
  res,
  data,
  pagination,
  message = SUCCESS_MESSAGES.DATA_RETRIEVED
) => {
  const response = {
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
    },
  };

  return res.status(HTTP_STATUS.OK).json(response);
};

export const createdResponse = (
  res,
  data,
  message = SUCCESS_MESSAGES.DATA_CREATED
) => {
  return successResponse(res, data, message, HTTP_STATUS.CREATED);
};

export const updatedResponse = (
  res,
  data,
  message = SUCCESS_MESSAGES.DATA_UPDATED
) => {
  return successResponse(res, data, message, HTTP_STATUS.OK);
};

export const deletedResponse = (
  res,
  message = SUCCESS_MESSAGES.DATA_DELETED
) => {
  return successResponse(res, null, message, HTTP_STATUS.OK);
};
