import express from "express";

// Membuat aplikasi express.
const app = express();

// Menentukan port yang akan dipakai oleh aplikasi express untuk menerima request.
// Pastikan port ini sedang tidak terpakai oleh aplikasi lain.
const port = 3000;

// Membuat default endpoint supaya mengembalikan pesan: halo temen2!.
app.get("/", (req, res) => {
  res.send("halo temen2!");
});

// Mulai menerima request di port yang kita tentukan diatas,
// kemudian menampilkan pesan di console ketika semuanya sudah siap.
app.listen(port, () => {
  console.log(`api siap menerima request di port ${port}`);
});
