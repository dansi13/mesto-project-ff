export const openPopup = (popup) => {
    index.nameInput.value = index.profileName.textContent;
    index.jobInput.value = index.profileJob.textContent;

    popup.classList.add('popup_is-opened');
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
}

export const escKeyListener = (event) => {
    if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
    }
}

import * as index from '../index.js';