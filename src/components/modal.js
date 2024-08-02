export const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escKeyListener);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escKeyListener);
}

export const escKeyListener = (event) => {
    if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
    closePopup(openedPopup);
        }
    }
}

export function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
}

export function openDeletePopup(cardId, cardElement) {
    const deletePopup = document.querySelector('#delete-popup');
    const confirmButton = deletePopup.querySelector('.popup__confirm-button');
  
    deletePopup.classList.add('popup_opened');
  
    confirmButton.addEventListener('click', () => {
      deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          deletePopup.classList.remove('popup_opened');
        })
        .catch(err => {
          console.error(err);
        });
    }, { once: true });
  }