import knex from "knex";
import { TodoNotFoundError } from "../../core/ports/error.js";

class SQLite {
  constructor() {
    const dbClient = knex({
      client: "better-sqlite3",
      connection: {
        filename: "./db.sqlite",
      },
      useNullAsDefault: true,
    });

    this.dbClient = dbClient;
  }

  // Simpan todo baru ke repository.
  //
  // Return void.
  async insert(todo) {
    await this.dbClient
      .table("todos")
      .insert(todo)
      .then(() => null)
      .catch((err) => {
        if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
          throw TodoNotFoundError;
        }

        throw err;
      });
  }

  // Cari todo yang tersimpan.
  //
  // Return array of todos.
  async search(filter) {
    const queryBuilder = this.dbClient.table("todos");

    if (filter?.name) {
      queryBuilder.where("name", filter.name);
    }

    const todos = await queryBuilder.select();

    return todos.map((todo) => ({
      ...todo,
      is_completed: todo.is_completed === 1,
    }));
  }

  // Ambil todo dengan id spesifik.
  //
  // Return satu todo yang cocok dengan id atau undefined ketika todo tidak ditemukan.
  async get(id) {
    const todos = await this.dbClient
      .table("todos")
      .where("id", id)
      .select()
      .limit(1);

    return todos[0];
  }

  // Ubah data todo.
  //
  // Return void.
  async update(updatedTodo) {
    const updatedTodoCount = await this.dbClient
      .table("todos")
      .where("id", updatedTodo.id)
      .update(updatedTodo);

    if (updatedTodoCount == 0) {
      throw TodoNotFoundError;
    }
  }

  // Hapus todo dengan id spesifik.
  //
  // Return void.
  async delete(id) {
    const deletedTodoCount = await this.dbClient
      .table("todos")
      .where("id", id)
      .delete();

    if (deletedTodoCount == 0) {
      throw TodoNotFoundError;
    }
  }
}

export default SQLite;
