class Handler {
  constructor(service) {
    this.service = service;
  }

  createHandler = this.#newHandler(async (name) => {
    await this.service.create(name);

    console.log("ok");
  });

  listHandler = this.#newHandler(async () => {
    const todos = await this.service.list();

    console.log(todos);
  });

  togglehandler = this.#newHandler(async (id) => {
    await this.service.toggle(id);

    console.log("ok");
  });

  deletehandler = this.#newHandler(async (id) => {
    await this.service.delete(id);

    console.log("ok");
  });

  updateHandler = this.#newHandler(async (id, name) => {
    console.log(id, name);
    await this.service.update(id, name);

    console.log("ok");
  });

  #newHandler(handlerFunc) {
    return async (...args) => {
      await handlerFunc(...args);

      process.exit();
    };
  }
}

export default Handler;
