import express from "express";
import InMemoryTodoRepository from "../adapter/repositories/inmemory.js";
import SQLiteTodoRepository from "../adapter/repositories/sqlite.js";
import TodoService from "../core/impl/service.js";
import RouteHandler from "./handler.js";
import middleware from "./middleware.js";

// Membuat aplikasi express.
const app = express();

// Menentukan port yang akan dipakai oleh aplikasi express untuk menerima request.
// Pastikan port ini sedang tidak terpakai oleh aplikasi lain.
const port = 3000;

// Untuk bisa baca json payload.
app.use(express.json());

// Membuat repository todo, kita bisa memilih antara InMemory atau SQLite.
// const repository = new InMemoryTodoRepository();
const repository = new SQLiteTodoRepository();

// Membuat service todo.
const service = new TodoService(repository);

// Membuat route handler.
const routeHandler = new RouteHandler(service);

// Daftarkan endpoint untuk menambahkan todo baru.
app.post("/todos", (...args) => routeHandler.create(...args));

// Daftarkan endpoint untuk menampilkan todos yang telah dibuat.
app.get("/todos", (...args) => routeHandler.list(...args));

// Daftarkan endpoint untuk menandai todo sebagai selesai atau belum selesai.
//
// ExpressJS mempunyai fitur route parameter supaya kita bisa membuat handler
// untuk suatu url yang dinamis, dalam hal ini url-nya bisa berubah-ubah
// sesuai dengan id dari todo yang mau di-toggle.
app.post("/todos/:id/toggle", (...args) => routeHandler.toggle(...args));

// Daftarkan endpoint untuk mengubah todo.
app.put("/todos/:id", (...args) => routeHandler.update(...args));

// Daftarkan endpoint untuk menghapus todo.
app.delete("/todos/:id", (...args) => routeHandler.delete(...args));

// Pakai middleware untuk handle ketika error terjadi. Ini berguna untuk
// memutuskan tipe error apa yang akan dikembalikan ke API client.
app.use(middleware.errorHandler);

// Mulai menerima request di port yang kita tentukan diatas,
// kemudian menampilkan pesan di console ketika semuanya sudah siap.
app.listen(port, () => {
  console.log(`api siap menerima request di port ${port}`);
});
