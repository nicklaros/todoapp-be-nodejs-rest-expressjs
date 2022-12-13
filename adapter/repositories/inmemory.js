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

  // Ambil todo dengan id spesifik.
  get(id) {
    return this.todos.find((todo) => {
      return todo.id === id;
    });
  }

  // Ubah data todo.
  update(updatedTodo) {
    const updatedTodoIndex = this.todos.findIndex((todo) => {
      return todo.id === updatedTodo.id;
    });

    if (updatedTodoIndex < 0) {
      return new Error("todo not found");
    }

    this.todos[updatedTodoIndex] = updatedTodo;
  }
}

export default InMemory;
