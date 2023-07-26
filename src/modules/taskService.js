import taskStorage from './taskStorage';
import Task from './Task';

class TaskService {
  categories = ['task', 'random thought', 'idea'];

  dateRegex = /(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/g;

  getAll() {
    const tasks = taskStorage.getAll();
    if (!tasks) return null;
    return tasks;
  }

  create(name, category, content) {
    if (!this.categories.includes(category.toLowerCase())) {
      throw new Error('Wrong task category');
    }

    const newTask = new Task(name, category.toLowerCase(), content);
    newTask.dates = newTask.content.match(this.dateRegex);

    const result = taskStorage.create(newTask);
    if (!result) {
      throw new Error('Could not create task');
    }
    return result;
  }

  update(id, updatedData) {
    const task = taskStorage.get(id);
    if (!task) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }

    if (updatedData.category && !this.categories.contains(updatedData.category)) {
      throw new Error('Wrong task category');
    }

    const updatedTask = { ...task, ...updatedData };
    updatedTask.dates = updatedTask.content.match(this.dateRegex);

    return taskStorage.update(updatedTask);
  }

  delete(id) {
    const result = taskStorage.delete(id);
    if (!result) {
      throw new Error(`Task with id ${id} doesn't exist`);
    }
    return result;
  }
}

const taskService = new TaskService();
export default taskService;
