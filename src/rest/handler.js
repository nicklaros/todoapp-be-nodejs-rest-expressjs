class Handler {
  constructor(service) {
    this.service = service;
  }

  // Handler untuk membuat todo baru.
  create = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    // Ambil nama todo baru dari body payload-nya request.
    //
    // Karna body payload dikirim dalam bentuk json maka kita perlu memakai `express.json()` middleware
    // untuk membacanya.
    const name = req.body.name;

    await this.service.create(name);

    res.json({
      error: null,
    });
  });

  // Handler untuk mengambil daftar todo.
  list = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const todos = await this.service.list();

    res.json({
      todos,
    });
  });

  // Handler untuk menandai todo sebagai selesai atau belum selesai.
  toggle = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    // Ambil id todo yang di-toggle dari route parameters, semua route parameters bisa diakses melalui object `req.params`.
    await this.service.toggle(req.params.id);

    res.json({
      error: null,
    });
  });

  // Handler untuk menghapus todo.
  delete = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.delete(req.params.id);

    res.json({
      error: null,
    });
  });

  // Handler untuk mengubah todo.
  update = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.update(req.params.id, req.body.name);

    res.json({
      error: null,
    });
  });

  // Function untuk membuat route handler yang bisa catch semua exception yang terjadi untuk menghindari aplikasi crash.
  #newHandlerWithExceptionCatcher(handlerFunc) {
    return async (req, res, next) => {
      try {
        await handlerFunc(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  }
}

export default Handler;
