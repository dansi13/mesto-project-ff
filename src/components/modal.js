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

import * as index from '../index.js';