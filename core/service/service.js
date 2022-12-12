import { v4 as uuidv4 } from "uuid";

class Todo {
  constructor(repository) {
    // Repository yang digunakan untuk menyimpan semua todo.
    this.repository = repository;
  }

  // Buat todo baru.
  create(name) {
    return this.repository.insert({
      id: uuidv4(),
      name,
      is_completed: false,
    });
  }

  // Ambil daftar todo.
  list() {
    return this.repository.search();
  }
}

export default Todo;
