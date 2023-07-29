import createElement from '../../helpers/domHelper';
import taskService from '../taskService';
import { showModal, hideModal } from './modal';

export default function showConfirmModal(action, id) {
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

  confirmMessage.textContent = `Are you sure you want to ${action} this task?`;
  confirmButton.textContent = `${action[0].toUpperCase() + action.substring(1)}`;
  denyButton.textContent = 'No';
  confirmButton.onclick = onConfirm;
  denyButton.onclick = hideModal;

  confirmBody.append(confirmMessage, confirmButton, denyButton);

  showModal({ title: '', bodyElement: confirmBody });
}
