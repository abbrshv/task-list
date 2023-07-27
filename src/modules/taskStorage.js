class TaskStorage {
  #id = 0;

  #taskMap = new Map();

  generateId() {
    this.#id += 1;
    return this.#id;
  }

  create(task) {
    const newTask = { ...task };
    newTask.id = this.generateId();
    newTask.createdDate = new Date();
    return this.#taskMap.set(newTask.id, newTask).has(newTask.id);
  }

  get(id) {
    return { ...this.#taskMap.get(id) };
  }

  getAll() {
    return [...this.#taskMap.values()];
  }

  update(task) {
    return this.#taskMap.set(task.id, task).has(task.id);
  }

  delete(id) {
    return this.#taskMap.delete(id);
  }
}

const taskStorage = new TaskStorage();
export default taskStorage;
