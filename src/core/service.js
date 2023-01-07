import { v4 as uuidv4 } from "uuid";
import { DuplicateTodoError, TodoNotFoundError } from "./ports/error.js";
import AbstractService from "./ports/service.js";

class Todo extends AbstractService {
  // Dependency injection, kita inject repository ketika membuat Todo service.
  //
  // - repository: digunakan untuk menyimpan semua todo
  constructor(repository) {
    super();

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

    // Kalau name tidak berubah maka return tanpa mengubah apapun.
    if (todo.name === name) {
      return;
    }

    const existingTodos = await this.repository.list({
      name,
    });

    // Apabila ada todo lain dengan nama yang sama maka throw error.
    if (existingTodos.length > 0) {
      throw DuplicateTodoError;
    }

    await this.repository.update({
      id,
      name,
      is_completed: todo.is_completed,
    });
  }
}

export default Todo;
