class InMemory {
  constructor() {
    // Untuk menampung semua todo.
    this.todos = [];
  }

  // Simpan todo baru ke repository.
  insert(todo) {
    this.todos.push(todo);
  }

  // Cari todo yang tersimpan.
  search() {
    return this.todos;
  }
}

export default InMemory;
