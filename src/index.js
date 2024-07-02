// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './styles/index.css';
import './components/cards.js';
import './components/modal.js';
import './components/card.js';

import { createCard } from './components/card.js';
import { handleLikeClick } from './components/card.js';
import { deleteCard } from './components/card.js';
import {openPopup} from './components/modal.js';
import {closePopup} from './components/modal.js';
import {escKeyListener} from './components/modal.js';
import {initialCards} from './components/cards.js';
import {handleOverlayClick} from './components/modal.js';

const placesList = document.querySelector('.places__list');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtnList = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const cardSaveButton = popupNewCard.querySelector('.popup__button');
const popupAllList = document.querySelectorAll('.popup');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const template = document.getElementById('card-template').content.querySelector('.card');

function renderCards(cardList) {
    for (let i = 0; i < cardList.length; i = i + 1) {
        const cardData = cardList[i];
        const card = createCard(cardData, deleteCard, handleLikeClick, cardClickHandler);
        
        placesList.append(card);
    }
}

renderCards(initialCards);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

popupNewCardForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target.closest('form');
    const formData = new FormData(form);

    const cardData = {
    name: formData.get('place-name'),
    link: formData.get('link')
    }

    const card = createCard(cardData, deleteCard, handleLikeClick, cardClickHandler);
    
    placesList.prepend(card);

    closePopup(popupNewCard);

    popupNewCard.querySelector('.popup__form').reset();
}

popupAllList.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})

const openPopupImage = (popup, imgSrc, caption) => {
    openPopup(popup);
    popupImage.querySelector('.popup__image').src = imgSrc;
    popupImage.querySelector('.popup__image').alt = caption;
    popupImage.querySelector('.popup__caption').textContent = caption;
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
}

editBtn.addEventListener('click', () => openProfilePopup());
addBtn.addEventListener('click', () => openPopup(popupNewCard));

function cardClickHandler(cardData) {
    const imgSrc = cardData.link
    const caption = cardData.name
    openPopupImage(popupImage, imgSrc, caption);
}

closeBtnList.forEach((close) => {
    close.addEventListener('click', () => closePopup(popupEdit));
    close.addEventListener('click', () => closePopup(popupNewCard));
    close.addEventListener('click', () => closePopup(popupImage));
});

popupEdit.addEventListener('click', handleOverlayClick);
popupNewCard.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);