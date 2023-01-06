// Function untuk membuat route handler yang bisa catch semua exception yang terjadi untuk menghindari aplikasi crash.
const newHandlerWithExceptionCatcher = (handlerFunc) => {
  return async (req, res, next) => {
    try {
      await handlerFunc(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

// Handler untuk membuat todo baru.
const createHandler = newHandlerWithExceptionCatcher(async (req, res) => {
  const service = req.app.get("service");

  // Ambil nama todo baru dari body payload-nya request.
  //
  // Karna body payload dikirim dalam bentuk json maka kita perlu memakai `express.json()` middleware
  // untuk membacanya.
  const name = req.body.name;

  await service.create(name);

  res.json({
    error: null,
  });
});

// Handler untuk mengambil daftar todo.
const listHandler = newHandlerWithExceptionCatcher(async (req, res) => {
  const service = req.app.get("service");

  const todos = await service.list();

  res.json({
    todos,
  });
});

// Handler untuk menandai todo sebagai selesai atau belum selesai.
const toggleHandler = newHandlerWithExceptionCatcher(async (req, res) => {
  const service = req.app.get("service");

  // Ambil id todo yang di-toggle dari route parameters, semua route parameters bisa diakses melalui object `req.params`.
  await service.toggle(req.params.id);

  res.json({
    error: null,
  });
});

// Handler untuk menghapus todo.
const deleteHandler = newHandlerWithExceptionCatcher(async (req, res) => {
  const service = req.app.get("service");

  await service.delete(req.params.id);

  res.json({
    error: null,
  });
});

// Handler untuk mengubah todo.
const updateHandler = newHandlerWithExceptionCatcher(async (req, res) => {
  const service = req.app.get("service");

  await service.update(req.params.id, req.body.name);

  res.json({
    error: null,
  });
});

export default {
  createHandler,
  listHandler,
  toggleHandler,
  deleteHandler,
  updateHandler,
};
