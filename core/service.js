import { v4 as uuidv4 } from "uuid";
import { DuplicateTodoError, TodoNotFoundError } from "./ports/error.js";

class Todo {
  // Dependency injection, kita inject repository ketika membuat Todo service.
  //
  // - repository: digunakan untuk menyimpan semua todo
  constructor(repository) {
    this.repository = repository;
  }

  // Buat todo baru.
  //
  // Return void.
  async create(name) {
    const existingTodos = await this.repository.list({
      name,
    });

    if (existingTodos.length > 0) {
      throw DuplicateTodoError;
    }

    await this.repository.create({
      id: uuidv4(),
      name,
      is_completed: false,
    });
  }

  // Ambil daftar todo.
  //
  // Return array of todos.
  async list() {
    return this.repository.list();
  }

  // Tandai todo sebagai selesai atau belum selesai.
  //
  // Return void.
  async toggle(id) {
    const todo = await this.repository.get(id);

    if (!todo) {
      throw TodoNotFoundError;
    }

    await this.repository.update({
      id,
      name: todo.name,
      is_completed: !todo.is_completed,
    });
  }

  // Hapus todo.
  //
  // Return void.
  async delete(id) {
    await this.repository.delete(id);
  }

  // Ubah todo.
  //
  // Return void.
  async update(id, name) {
    const todo = await this.repository.get(id);

    if (!todo) {
      throw TodoNotFoundError;
    }

    if (todo.name !== name) {
      const existingTodos = await this.repository.list({
        name,
      });

      if (existingTodos.length > 0) {
        throw DuplicateTodoError;
      }
    }

    await this.repository.update({
      id,
      name,
      is_completed: todo.is_completed,
    });
  }
}

export default Todo;
