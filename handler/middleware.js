import AppError, { TODO_NOT_FOUND_ERROR_NAME } from "../core/ports/error.js";

const errorHandler = (error, req, res, next) => {
  // Default ke 500 server error ketika error tidak dikenali.
  let returnedError = {
    statusCode: 500,
    errorMessage: "ups ada yang salah",
  };

  if (error instanceof AppError) {
    const clientErrors404 = [TODO_NOT_FOUND_ERROR_NAME];

    if (clientErrors404.includes(error.name)) {
      returnedError = {
        statusCode: 404,
        errorMessage: error.message,
      };
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
