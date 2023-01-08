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
const cliHandler = new Handler(service);

program
  .command("new")
  .description("buat todo baru")
  .argument("<name>", "nama dari todo baru")
  .action((...args) => cliHandler.create(...args));

program
  .command("list")
  .description("tampilkan daftar todo")
  .action((...args) => cliHandler.list(...args));

program
  .command("toggle")
  .description("toggle todo")
  .argument("<id>", "id todo yang mau di-toggle")
  .action((...args) => cliHandler.toggle(...args));

program
  .command("delete")
  .description("hapus todo")
  .argument("<id>", "id todo yang mau di-hapus")
  .action((...args) => cliHandler.delete(...args));

program
  .command("update")
  .description("ubah todo")
  .argument("<id>", "id todo yang mau di-ubah")
  .argument("<name>", "nama todo")
  .action((...args) => cliHandler.update(...args));

program.parse();
