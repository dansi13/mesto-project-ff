// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './styles/index.css';
import './components/cards.js';
import './components/modal.js';
import './components/card.js';
import './components/validation.js';
import './components/api.js';

import { getUserInfo, updateUserInfo, getInitialCards, addCard, addLike, removeLike, deleteCard, updateAvatar } from './components/api.js';
import { createCard, handleLikeClick, handleDeleteCard } from './components/card.js';
import {openPopup, closePopup, escKeyListener, handleOverlayClick} from './components/modal.js';
import {initialCards} from './components/cards.js';
import {hideInputError, enableValidation, clearValidation} from './components/validation.js';

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
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('input[name="avatar"]');
const avatarSaveButton = avatarForm.querySelector('.popup__button_avatar');
const profileImage = document.querySelector('.profile__image');
let userId


const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

enableValidation(settings);


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const saveButton = popupEditForm.querySelector('.profile-form__submit-button');
    saveButton.textContent = 'Сохранение...';
  
    updateUserInfo(nameValue, jobValue)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
  
        saveButton.textContent = 'Сохранить';
  
        closePopup(popupEdit);
      })
      .catch((err) => {
        console.error(err);
        saveButton.textContent = 'Сохранить';
      });
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

    const saveButton = form.querySelector('.card-form__submit-button');
    saveButton.textContent = 'Сохранение...';
  
    addCard(cardData.name, cardData.link)
      .then((cardData) => {
        const cardElement = createCard(cardData, userId);
        placesList.prepend(cardElement);
  
        saveButton.textContent = 'Создать';
        form.reset();
        
        closePopup(popupNewCard);
        form.reset();

        clearValidation(popupNewCardForm, settings);
      })
      .catch((err) => {
        console.error(err);
        saveButton.textContent = 'Создать';
      });
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

    hideInputError(popupEditForm, nameInput, settings);
    hideInputError(popupEditForm, jobInput, settings);

    clearValidation(popupEditForm, settings);
    
    openPopup(popupEdit);
}

editBtn.addEventListener('click', () => openProfilePopup());
addBtn.addEventListener('click', () => openPopup(popupNewCard));

export function cardClickHandler(cardData) {
    const imgSrc = cardData.link
    const caption = cardData.name
    openPopupImage(popupImage, imgSrc, caption);
}

closeBtnList.forEach((close) => {
    close.addEventListener('click', () => closePopup(popupEdit));
    close.addEventListener('click', () => closePopup(popupNewCard));
    close.addEventListener('click', () => closePopup(popupImage));
    close.addEventListener('click', () => closePopup(avatarPopup));
});

popupEdit.addEventListener('click', handleOverlayClick);
popupNewCard.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);
avatarPopup.addEventListener('click', handleOverlayClick);

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach(cardData => {
      const cardElement = createCard(cardData, userId);
      document.querySelector('.places__list').append(cardElement);
    });
  })
  .catch(err => {
    console.error(err);
  });
  });

// Открытие попапа для редактирования аватар

profileImage.addEventListener('click', () => {
  openPopup(avatarPopup);
});

const checkUrl = (url) => {
  const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  return regex.test(url);
}

avatarForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatarUrl = avatarInput.value;

  if (!checkUrl(avatarUrl)) {
    avatarInput.setCustomValidity("Введите правильный URL на изображение.");
    avatarInput.reportValidity();
    return;
  }

  avatarSaveButton.textContent = 'Сохранение...';

  updateAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
    });
});