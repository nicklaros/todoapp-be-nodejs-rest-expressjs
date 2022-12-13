// Handler untuk membuat todo baru.
const create = async (req, res, next) => {
  const service = req.app.get("service");

  // Ambil nama todo baru dari body payload-nya request.
  //
  // Karna body payload dikirim dalam bentuk json maka kita perlu memakai `express.json()` middleware
  // untuk membacanya.
  const error = await service.create(req.body.name).catch((err) => err);

  if (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

// Handler untuk mengambil daftar todo.
const list = async (req, res) => {
  const service = req.app.get("service");

  const todos = await service.list();

  res.json({
    todos,
  });
};

// Handler untuk menandai todo sebagai selesai atau belum selesai.
const toggle = async (req, res, next) => {
  const service = req.app.get("service");

  // Ambil id todo yang di-toggle dari route parameters, semua route parameters bisa diakses melalui object `req.params`.
  const error = await service.toggle(req.params.id).catch((err) => err);

  if (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

const remove = async (req, res, next) => {
  const service = req.app.get("service");

  const error = await service.remove(req.params.id).catch((err) => err);

  if (error) {
    return next(error);
  }

  res.json({
    error: null,
  });
};

const update = async (req, res, next) => {
  const service = req.app.get("service");

  const error = await service
    .update(req.params.id, req.body.name)
    .catch((err) => err);

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
  remove,
  update,
};
