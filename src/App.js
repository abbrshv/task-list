import createElement from './helpers/domHelper';
import TaskView from './modules/TaskView';
import taskService from './modules/taskService';

export default class App {
  static loadTables() {
    const container = document.querySelector('.container');
    const archiveCollapsible = TaskView.createCollapsible(
      'Archive',
      TaskView.createTaskTable('task-archive', taskService.getAllArchived()),
    );
    const statsCollapsible = TaskView.createCollapsible(
      'Statistics',
      TaskView.createStatsTable(taskService.getStats()),
    );
    container.append(TaskView.createTaskTable('task-active', taskService.getAllActive()));
    container.append(archiveCollapsible, statsCollapsible);
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
