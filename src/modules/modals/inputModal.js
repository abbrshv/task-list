import createElement from '../../helpers/domHelper';
import taskService from '../taskService';
import Task from '../Task';
import { categories } from '../../constants/categories';
import { showModal, hideModal } from './modal';

function createForm(...fieldNames) {
  const inputForm = createElement({ tagName: 'form', className: 'input-form' });
  const submitButton = createElement({
    tagName: 'button',
    className: 'btn btn-confirm',
  });
  submitButton.textContent = 'Submit';

  const categoryOptions = categories.map(
    (category) => new Option(category[0].toUpperCase() + category.substring(1), category),
  );

  fieldNames.forEach((name) => {
    const fieldTag = name === 'category' ? 'select' : 'input';
    const label = createElement({
      tagName: 'label',
      className: '',
      attributes: {
        for: name,
      },
    });
    label.textContent = name[0].toUpperCase() + name.substring(1);

    const field = createElement({
      tagName: fieldTag,
      className: `${name}-input`,
      attributes: {
        type: 'text',
        id: name,
        name: name,
      },
    });

    if (name === 'category') field.append(...categoryOptions);

    inputForm.append(label, field);
  });

  inputForm.appendChild(submitButton);
  return inputForm;
}

export default function showInputModal(action, id) {
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      const formDataObj = Object.fromEntries(new FormData(event.target).entries());
      if (action === 'create') taskService.create(formDataObj);
      else taskService.update(id, formDataObj);
      hideModal();
    } catch (error) {
      // Basic error handling done as example
      // eslint-disable-next-line no-alert
      alert(`Could not ${action} task`);
      // eslint-disable-next-line no-console
      console.warn(error.message);
    }
  };

  const inputBody = createElement({ tagName: 'div', className: 'modals-input' });
  const inputForm = createForm(...Object.getOwnPropertyNames(new Task()));
  inputForm.onsubmit = onSubmit;

  inputBody.append(inputForm);

  showModal({ title: '', bodyElement: inputBody });
}
