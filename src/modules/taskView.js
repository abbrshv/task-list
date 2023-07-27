import createElement from '../helpers/domHelper';

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
    const buttonClasses = ['btn-edit', 'btn-archive', 'btn-delete'];
    const button = createElement({ tagName: 'button' });
    const buttonSpan = createElement({ tagName: 'span' });
    const buttons = [button, button.cloneNode(), button.cloneNode()];

    buttons.forEach((btn, idx) => {
      btn.classList.add('btn');
      btn.classList.add(buttonClasses[idx]);
      // eslint-disable-next-line no-param-reassign
      btn.dataset.id = id;
      buttonSpan.appendChild(btn);
    });

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
        category,
        content,
        formatDates,
        buttons,
      );
      table.appendChild(row);
    });

    return table;
  }
}
