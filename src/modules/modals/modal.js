import createElement from '../../helpers/domHelper';

function getModalContainer() {
  return document.querySelector('.container');
}
export function hideModal() {
  const modal = document.getElementsByClassName('modals-layer')[0];
  modal?.remove();
  document.querySelector('.btn-reload').click();
}

function createHeader(title) {
  const headerElement = createElement({ tagName: 'div', className: 'modals-header' });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({ tagName: 'div', className: 'close-btn' });

  titleElement.innerText = title;
  closeButton.innerText = '×';

  const close = () => {
    hideModal();
  };
  closeButton.addEventListener('click', close);
  headerElement.append(titleElement, closeButton);

  return headerElement;
}

function createModal({ title, bodyElement }) {
  const layer = createElement({ tagName: 'div', className: 'modals-layer' });
  const modalContainer = createElement({ tagName: 'div', className: 'modals-root' });
  const header = createHeader(title);

  modalContainer.append(header, bodyElement);
  layer.append(modalContainer);

  return layer;
}

export function showModal({ title, bodyElement }) {
  if (document.getElementsByClassName('modals-layer')[0]) hideModal();
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement });

  root.append(modal);
}
