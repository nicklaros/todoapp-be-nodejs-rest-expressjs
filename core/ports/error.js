class AppError extends Error {
  constructor(name, message) {
    super(message);

    this.name = name;
  }
}

export const TODO_NOT_FOUND_ERROR_NAME = "TODO_NOT_FOUND";
export const DUPLICATE_TODO_ERROR_NAME = "DUPLICATE_TODO";

export const TodoNotFoundError = new AppError(
  TODO_NOT_FOUND_ERROR_NAME,
  "todo tidak ditemukan"
);

export const DuplicateTodoError = new AppError(
  DUPLICATE_TODO_ERROR_NAME,
  "todo dengan nama yang sama sudah ada"
);

export default AppError;
