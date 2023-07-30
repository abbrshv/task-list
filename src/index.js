import App from './App';
import taskService from './modules/taskService';
import tasks from './helpers/mockData';

try {
  tasks.forEach((task) => taskService.create(task));
  App.startApp();
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn(error);
}
