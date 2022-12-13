import AppError, {
  DUPLICATE_TODO_ERROR_NAME,
  TODO_NOT_FOUND_ERROR_NAME,
} from "../core/ports/error.js";

const errorHandler = (error, req, res, next) => {
  // Default ke 500 server error ketika error tidak dikenali.
  let returnedError = {
    statusCode: 500,
    errorMessage: "ups ada yang salah",
  };

  if (error instanceof AppError) {
    const clientErrorsMapByStatusCode = {
      400: [DUPLICATE_TODO_ERROR_NAME],
      404: [TODO_NOT_FOUND_ERROR_NAME],
    };

    const statusCodes = Object.keys(clientErrorsMapByStatusCode);

    for (let i = 0; i < statusCodes.length; i++) {
      const statusCode = statusCodes[i];

      if (clientErrorsMapByStatusCode[statusCode].includes(error.name)) {
        returnedError = {
          statusCode: parseInt(statusCode),
          errorMessage: error.message,
        };

        break;
      }
    }
  }

  // Kita bisa set response http status code menggunakan `res.status()`.
  res.status(returnedError.statusCode).json({
    error: returnedError.errorMessage,
  });
};

export default {
  errorHandler,
};
