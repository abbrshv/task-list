import createElement from '../helpers/domHelper';
import { categories } from '../constants/categories';

export default class TaskView {
  static createTableBase(className, ...headers) {
    const table = createElement({
      tagName: 'table',
      className: className,
    });

    const headerRow = createElement({ tagName: 'tr' });
    headers.forEach((header) => {
      const headerElement = createElement({ tagName: 'th' });
      headerElement.textContent = header;
      headerRow.appendChild(headerElement);
    });

    table.appendChild(headerRow);
    return table;
  }

  static createDataRow(...data) {
    const row = createElement({ tagName: 'tr' });
    data.forEach((item) => {
      const tableCell = createElement({ tagName: 'td' });
      if (item instanceof HTMLElement) tableCell.appendChild(item);
      else tableCell.textContent = item;
      row.append(tableCell);
    });
    return row;
  }

  static createRowButtons(id) {
    const buttonClasses = ['edit', 'archive', 'delete'];
    const buttonSpan = createElement({ tagName: 'span' });

    const buttons = buttonClasses.map((className) => {
      const button = createElement({
        tagName: 'button',
        className: `btn btn-${className}`,
      });
      button.dataset.id = id;
      return button;
    });
    buttonSpan.append(...buttons);

    return buttonSpan;
  }

  static createTaskTable(className, tasks) {
    const headers = ['Name', 'Created', 'Category', 'Content', 'Dates', ''];
    const table = this.createTableBase(className, ...headers);

    tasks.forEach((task) => {
      const buttons = this.createRowButtons(task.id);

      const { name, category, content, dates, createdDate } = task;
      const formatCreatedDate = `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
      const formatDates = dates ? dates.join(', ') : '';

      const row = this.createDataRow(
        name,
        formatCreatedDate,
        category[0].toUpperCase() + category.substring(1),
        content,
        formatDates,
        buttons,
      );
      table.appendChild(row);
    });

    return table;
  }

  static createStatsTable(statsObj) {
    const headers = ['Note Category', 'Active', 'Archived'];
    const table = this.createTableBase('stats-table', ...headers);

    categories.forEach((category, idx) => {
      const categoryFormat = category[0].toUpperCase() + category.substring(1);
      const row = this.createDataRow(categoryFormat, statsObj.active[idx], statsObj.archived[idx]);
      table.appendChild(row);
    });

    return table;
  }
}
