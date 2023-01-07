import { program } from "commander";
import InMemoryTodoRepository from "../adapter/repositories/inmemory.js";
import SQLiteTodoRepository from "../adapter/repositories/sqlite.js";
import TodoService from "../core/impl/service.js";
import Handler from "./handler.js";

// Membuat repository todo, kita bisa memilih antara InMemory atau SQLite.
// const repository = new InMemoryTodoRepository();
const repository = new SQLiteTodoRepository();

// Membuat service todo.
const service = new TodoService(repository);

// Membuat cli handler.
const handler = new Handler(service);

program
  .command("new")
  .description("buat todo baru")
  .argument("<name>", "nama dari todo baru")
  .action((name) => handler.createHandler(name));

program
  .command("list")
  .description("tampilkan daftar todo")
  .action(() => handler.listHandler());

program
  .command("toggle")
  .description("toggle todo")
  .argument("<id>", "id todo yang mau di-toggle")
  .action((id) => handler.togglehandler(id));

program
  .command("delete")
  .description("hapus todo")
  .argument("<id>", "id todo yang mau di-hapus")
  .action((id) => handler.deletehandler(id));

program
  .command("update")
  .description("ubah todo")
  .argument("<id>", "id todo yang mau di-ubah")
  .argument("<name>", "nama todo")
  .action((id, name) => handler.updateHandler(id, name));

program.parse();
