import { TodoNotFoundError } from "../../core/ports/error.js";

class InMemory {
  constructor() {
    // Untuk menampung semua todo.
    this.todos = [];
  }

  // Simpan todo baru ke repository.
  insert(todo) {
    this.todos.push(todo);
  }

  // Cari todo yang tersimpan.
  search(filter) {
    if (!filter) {
      return this.todos;
    }

    let result = this.todos;

    if (filter.name) {
      result = result.filter((todo) => {
        return todo.name === filter.name;
      });
    }

    return result;
  }

  // Ambil todo dengan id spesifik.
  get(id) {
    return this.todos.find((todo) => {
      return todo.id === id;
    });
  }

  // Ubah data todo.
  update(updatedTodo) {
    const updatedTodoIndex = this.todos.findIndex((todo) => {
      return todo.id === updatedTodo.id;
    });

    if (updatedTodoIndex < 0) {
      return TodoNotFoundError;
    }

    this.todos[updatedTodoIndex] = updatedTodo;
  }
}

export default InMemory;
