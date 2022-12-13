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

  // Tandai todo sebagai selesai atau belum selesai.
  toggle(id) {
    const todo = this.repository.get(id);

    if (!todo) {
      return new Error("todo not found");
    }

    return this.repository.update({
      id,
      name: todo.name,
      is_completed: !todo.is_completed,
    });
  }
}

export default Todo;
