class AbstractRepository {
  constructor() {
    if (this.constructor == AbstractRepository) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  // Simpan todo baru ke repository.
  //
  // Return void.
  async create(todo) {
    throw new Error("Method 'create()' must be implemented.");
  }

  // Cari todo yang tersimpan berdasarkan filter.
  //
  // Return array of todos.
  async list(filter) {
    throw new Error("Method 'list()' must be implemented.");
  }

  // Ambil todo dengan id spesifik.
  //
  // Return satu todo yang cocok dengan id atau undefined ketika todo tidak ditemukan.
  async get(id) {
    throw new Error("Method 'get()' must be implemented.");
  }

  // Ubah data todo.
  //
  // Return void.
  async update(updatedTodo) {
    throw new Error("Method 'update()' must be implemented.");
  }

  // Hapus todo dengan id spesifik.
  //
  // Return void.
  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

export default AbstractRepository;
