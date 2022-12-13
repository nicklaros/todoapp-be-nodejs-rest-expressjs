class AppError extends Error {
  constructor(name, message) {
    super(message);

    this.name = name;
  }
}

export const TODO_NOT_FOUND_ERROR_NAME = "TODO_NOT_FOUND_ERROR";

export const TodoNotFoundError = new AppError(
  TODO_NOT_FOUND_ERROR_NAME,
  "todo tidak ditemukan"
);

export default AppError;
