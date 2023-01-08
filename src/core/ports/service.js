class AbstractService {
  constructor() {
    if (this.constructor == AbstractService) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  // Buat todo baru.
  //
  // Return void.
  async create(name) {
    throw new Error("Method 'create()' must be implemented.");
  }

  // Ambil daftar todo.
  //
  // Return array of todos.
  async list() {
    throw new Error("Method 'list()' must be implemented.");
  }

  // Tandai todo sebagai selesai atau belum selesai.
  //
  // Return void.
  async toggle(id) {
    throw new Error("Method 'toggle()' must be implemented.");
  }

  // Ubah todo.
  //
  // Return void.
  async update(id, name) {
    throw new Error("Method 'update()' must be implemented.");
  }

  // Hapus todo.
  //
  // Return void.
  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

export default AbstractService;
