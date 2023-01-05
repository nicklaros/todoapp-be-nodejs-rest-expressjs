// Handler untuk membuat todo baru.
const createHandler = async (req, res, next) => {
  const service = req.app.get("service");

  try {
    // Ambil nama todo baru dari body payload-nya request.
    //
    // Karna body payload dikirim dalam bentuk json maka kita perlu memakai `express.json()` middleware
    // untuk membacanya.
    await service.create(req.body.name);
  } catch (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

// Handler untuk mengambil daftar todo.
const listHandler = async (req, res) => {
  const service = req.app.get("service");

  const todos = await service.list();

  res.json({
    todos,
  });
};

// Handler untuk menandai todo sebagai selesai atau belum selesai.
const toggleHandler = async (req, res, next) => {
  const service = req.app.get("service");

  try {
    // Ambil id todo yang di-toggle dari route parameters, semua route parameters bisa diakses melalui object `req.params`.
    await service.toggle(req.params.id);
  } catch (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

const deleteHandler = async (req, res, next) => {
  const service = req.app.get("service");

  try {
    await service.delete(req.params.id);
  } catch (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

const updateHandler = async (req, res, next) => {
  const service = req.app.get("service");

  try {
    await service.update(req.params.id, req.body.name);
  } catch (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

export default {
  createHandler,
  listHandler,
  toggleHandler,
  deleteHandler,
  updateHandler,
};
