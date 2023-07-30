import createElement from '../../helpers/domHelper';
import taskService from '../taskService';
import { showModal, hideModal } from './modal';

export default function showConfirmModal(action, id) {
  const task = taskService.get(id);
  const confirmBody = createElement({ tagName: 'div', className: 'modals-confirm' });
  const confirmMessage = createElement({ tagName: 'p', className: 'modals-confirm-msg' });
  const confirmButton = createElement({ tagName: 'button', className: 'btn btn-confirm' });
  const denyButton = createElement({ tagName: 'button', className: 'btn btn-deny' });

  const onConfirm = () => {
    try {
      if (action === 'delete') {
        taskService.delete(id);
      } else {
        taskService.changeArchive(id);
      }
      hideModal();
    } catch (error) {
      // Basic error handling done as example
      // eslint-disable-next-line no-alert
      alert(`Task does not exist`);
      // eslint-disable-next-line no-console
      console.warn(error.message);
    }
  };

  const finalAction = task.isArchived && action === 'archive' ? `un${action}` : action;
  confirmMessage.textContent = `Are you sure you want to ${finalAction} this task?`;
  confirmButton.textContent = `${finalAction[0].toUpperCase() + finalAction.substring(1)}`;
  denyButton.textContent = 'No';
  confirmButton.onclick = onConfirm;
  denyButton.onclick = hideModal;

  confirmBody.append(confirmMessage, confirmButton, denyButton);

  showModal({ title: '', bodyElement: confirmBody });
}
