// Handler untuk membuat todo baru.
const create = (req, res) => {
  const service = req.app.get("service");

  // Ambil nama todo baru dari body payload-nya request.
  //
  // Karna body payload dikirim dalam bentuk json maka kita perlu memakai `express.json()` middleware
  // untuk membacanya.
  service.create(req.body.name);

  res.json({
    error: null,
  });
};

// Handler untuk mengambil daftar todo.
const list = (req, res) => {
  const service = req.app.get("service");

  const todos = service.list();

  res.json({
    todos,
  });
};

export default {
  create,
  list,
};
