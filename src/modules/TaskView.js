import createElement from '../helpers/domHelper';
import { categories } from '../constants/categories';
import showInputModal from './modals/inputModal';
import showConfirmModal from './modals/confirmModal';

export default class TaskView {
  static createCollapsible(name, childElement) {
    const className = `${name.toLowerCase()}-content`;
    const collapsible = createElement({ tagName: 'div', className: 'collapsible' });
    const header = createElement({ tagName: 'h2', className: 'collapsible-header' });
    header.textContent = name;
    childElement.classList.add('content', className);
    collapsible.append(header, childElement);

    collapsible.onclick = (event) => {
      const content = document.querySelector(`.${className}`);
      if (content.style.maxHeight) {
        event.target.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        event.target.classList.add('active');
        content.style.maxHeight = `100%`;
      }
    };

    return collapsible;
  }

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
    const buttonActions = ['edit', 'archive', 'delete'];
    const buttonTextContent = ['✎', '⇅', '⌫'];
    const buttonSpan = createElement({ tagName: 'span' });

    const buttons = buttonActions.map((action, idx) => {
      const button = createElement({
        tagName: 'button',
        className: `btn btn-${action}`,
      });
      button.textContent = buttonTextContent[idx];
      if (action === 'edit') button.onclick = () => showInputModal(action, id);
      else button.onclick = () => showConfirmModal(action, id);
      return button;
    });
    buttonSpan.append(...buttons);

    return buttonSpan;
  }

  static createTaskTable(className, tasks) {
    const tableContainer = createElement({ tagName: 'div', className: `${className}-container` });
    const headers = ['Name', 'Created', 'Category', 'Content', 'Dates', ''];
    const table = this.createTableBase(`task-table ${className}`, ...headers);

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
    tableContainer.appendChild(table);

    if (className.includes('active')) {
      const createButton = createElement({ tagName: 'button', className: 'btn btn-create' });
      createButton.textContent = '+';
      createButton.onclick = () => showInputModal('create');
      tableContainer.appendChild(createButton);
    }

    return tableContainer;
  }

  static createStatsTable(statsObj) {
    const tableContainer = createElement({ tagName: 'div', className: `stats-container` });
    const headers = ['Note Category', 'Active', 'Archived'];
    const table = this.createTableBase('stats-table', ...headers);

    categories.forEach((category, idx) => {
      const categoryFormat = category[0].toUpperCase() + category.substring(1);
      const row = this.createDataRow(categoryFormat, statsObj.active[idx], statsObj.archived[idx]);
      table.appendChild(row);
    });
    tableContainer.appendChild(table);

    return tableContainer;
  }
}
