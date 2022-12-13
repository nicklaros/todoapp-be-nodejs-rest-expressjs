// Handler untuk membuat todo baru.
const create = (req, res) => {
  const service = req.app.get("service");

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
