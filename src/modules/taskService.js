import taskStorage from './taskStorage';
import Task from './Task';
import { categories } from '../constants/categories';

class TaskService {
  static dateRegex = /(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g;

  getAll() {
    const result = taskStorage.getAll();
    return result || null;
  }

  getAllActive() {
    const tasks = this.getAll();
    return tasks ? tasks.filter((task) => !task.isArchived) : null;
  }

  getAllArchived() {
    const tasks = this.getAll();
    return tasks ? tasks.filter((task) => task.isArchived) : null;
  }

  get(id) {
    const result = taskStorage.get(id);
    if (!result) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }
    return result;
  }

  create(task) {
    const { name, category, content } = task;
    if (!categories.includes(category.toLowerCase())) {
      throw new Error('Wrong task category');
    }

    const newTask = new Task(name, category.toLowerCase(), content);
    newTask.isArchived = false;
    newTask.dates = newTask.content.match(TaskService.dateRegex);

    const result = taskStorage.create(newTask);
    if (!result) {
      throw new Error('Could not create task');
    }

    return result;
  }

  update(id, updatedData) {
    if (updatedData.category && !categories.includes(updatedData.category)) {
      throw new Error('Wrong task category');
    }
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(updatedData).filter(([_, value]) => value !== ''),
    );

    const task = this.get(id);
    const updatedTask = { ...task, ...filteredData };
    updatedTask.dates = updatedTask.content.match(TaskService.dateRegex);

    return taskStorage.update(updatedTask);
  }

  delete(id) {
    const result = taskStorage.delete(id);
    if (!result) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }
    return result;
  }

  changeArchive(id) {
    const task = this.get(id);
    task.isArchived = !task.isArchived;
    this.update(id, task);
  }

  getStats() {
    const tasks = this.getAll();
    if (!tasks) return null;

    const statsObj = {};
    statsObj.active = categories.map((category) =>
      tasks.reduce((acc, cur) => acc + (cur.category === category ? 1 : 0), 0),
    );
    statsObj.archived = categories.map((category) =>
      tasks.reduce((acc, cur) => acc + (cur.category === category ? 1 : 0), 0),
    );

    return statsObj;
  }
}

const taskService = new TaskService();
export default taskService;
