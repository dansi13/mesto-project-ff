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
import { createCard } from './components/card.js';
import {openPopup, closePopup, escKeyListener, handleOverlayClick} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';

const placesList = document.querySelector('.places__list');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtnList = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const cardSaveButton = popupNewCard.querySelector('.card-form__submit-button');
const popupAllList = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const template = document.getElementById('card-template').content.querySelector('.card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('input[name="avatar"]');
const avatarSaveButton = avatarForm.querySelector('.popup__button_avatar');
const profileImage = document.querySelector('.profile__image');
const profileSaveButton = popupEditForm.querySelector('.profile-form__submit-button');
const image = popupImage.querySelector('.popup__image');
const imageCaption =  popupImage.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');
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

    profileSaveButton.textContent = 'Сохранение...';
  
    updateUserInfo(nameValue, jobValue)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
  
        closePopup(popupEdit);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        profileSaveButton.textContent = 'Сохранить';
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

    cardSaveButton.textContent = 'Сохранение...';
  
    addCard(cardData.name, cardData.link)
      .then((cardData) => {
        const cardElement = createCard(cardData, userId, {
          deleteCard: deleteCard,
          addLike: addLike,
          handleImageClick: openPopupImage});
        placesList.prepend(cardElement);
  
        form.reset();
        
        closePopup(popupNewCard);

        clearValidation(popupNewCardForm, settings);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardSaveButton.textContent = 'Создать';
      });
}

popupAllList.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})

const openPopupImage = (imgSrc, caption) => {
    openPopup(popupImage);
    image.src = imgSrc;
    image.alt = caption;
    imageCaption.textContent = caption;
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    clearValidation(popupEditForm, settings);
    
    openPopup(popupEdit);
}

editBtn.addEventListener('click', () => openProfilePopup());
addBtn.addEventListener('click', () => openPopup(popupNewCard));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
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
      const cardElement = createCard(cardData, userId, {
        deleteCard: deleteCard,
        addLike: addLike,
        handleImageClick: openPopupImage});
      placesList.append(cardElement);
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

avatarForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatarUrl = avatarInput.value;

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