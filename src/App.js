import createElement from './helpers/domHelper';
import TaskView from './modules/TaskView';
import taskService from './modules/taskService';

export default class App {
  static loadTables() {
    const container = document.querySelector('.container');
    container.append(TaskView.createTaskTable('task-active', taskService.getAllActive()));
    container.append(TaskView.createTaskTable('task-archive', taskService.getAllArchived()));
    container.append(TaskView.createStatsTable(taskService.getStats()));
  }

  static startApp() {
    const container = document.querySelector('.container');
    this.loadTables();

    const onReload = () => {
      container.innerHTML = '';
      this.startApp();
    };

    const reloadButton = createElement({ tagName: 'button', className: 'btn-reload' });
    reloadButton.style.display = 'none';
    reloadButton.addEventListener('click', onReload);
    container.append(reloadButton);
  }
}
