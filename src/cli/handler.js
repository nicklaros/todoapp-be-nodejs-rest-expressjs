class CommandHandler {
  constructor(service) {
    this.service = service;
  }

  create = this.#newHandler(async (name) => {
    await this.service.create(name);

    console.log("ok");
  });

  list = this.#newHandler(async () => {
    const todos = await this.service.list();

    console.log(todos);
  });

  toggle = this.#newHandler(async (id) => {
    await this.service.toggle(id);

    console.log("ok");
  });

  delete = this.#newHandler(async (id) => {
    await this.service.delete(id);

    console.log("ok");
  });

  update = this.#newHandler(async (id, name) => {
    await this.service.update(id, name);

    console.log("ok");
  });

  // Method untuk membuat handler yang mana akan menutup program
  // setelah selesai memproses command.
  #newHandler(handlerFunc) {
    return async (...args) => {
      await handlerFunc(...args);

      process.exit();
    };
  }
}

export default CommandHandler;
