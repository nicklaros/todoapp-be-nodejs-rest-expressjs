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

// Handler untuk menandai todo sebagai selesai atau belum selesai.
const toggle = (req, res, next) => {
  const service = req.app.get("service");

  // Ambil id todo yang di-toggle dari route parameters, semua route parameters bisa diakses melalui object `req.params`.
  const error = service.toggle(req.params.id);

  if (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

export default {
  create,
  list,
  toggle,
};
