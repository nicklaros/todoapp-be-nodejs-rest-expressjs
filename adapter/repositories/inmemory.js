import { TodoNotFoundError } from "../../core/ports/error.js";

class InMemory {
  constructor() {
    // Untuk menampung semua todo.
    this.todos = [];
  }

  // Simpan todo baru ke repository.
  //
  // Return void.
  async create(todo) {
    this.todos.push(todo);
  }

  // Cari todo yang tersimpan berdasarkan filter yang tersedia.
  // - name: filter todo berdasarkan nama.
  //
  // Return array of todos.
  async list(filter) {
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
  //
  // Return satu todo yang cocok dengan id atau undefined ketika todo tidak ditemukan.
  async get(id) {
    return this.todos.find((todo) => {
      return todo.id === id;
    });
  }

  // Ubah data todo.
  //
  // Return void.
  async update(updatedTodo) {
    const updatedTodoIndex = this.#getIndex(updatedTodo.id);

    if (updatedTodoIndex < 0) {
      throw TodoNotFoundError;
    }

    this.todos[updatedTodoIndex] = updatedTodo;
  }

  // Hapus todo dengan id spesifik.
  //
  // Return void.
  async delete(id) {
    const deletedTodoIndex = this.#getIndex(id);

    if (deletedTodoIndex < 0) {
      throw TodoNotFoundError;
    }

    this.todos.splice(deletedTodoIndex, 1);
  }

  #getIndex(id) {
    return this.todos.findIndex((todo) => {
      return todo.id === id;
    });
  }
}

export default InMemory;
