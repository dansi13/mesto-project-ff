const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(cardData, deleteCallback, likeCallback) {
  const template = document.getElementById('card-template').content.querySelector('.card');
  const card = template.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData['name'];
  card.querySelector('.card__delete-button').addEventListener('click', () => {
      deleteCallback(card)
  });

  card.querySelector('.card__like-button').addEventListener('click', likeCallback);

  return card;
}

const placesList = document.querySelector('.places__list');

function renderCards(cardList) {
  for (let i = 0; i < cardList.length; i = i + 1) {
      const cardData = cardList[i];
      const card = createCard(cardData, deleteCard, handleLikeClick);
      
      placesList.append(card);
  }
}

function deleteCard(card) {
  card.remove();
}

renderCards(initialCards);

// открытие и закрытие окон

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const cardBtn = document.querySelectorAll('.card__image');
const closeBtn = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


const openPopup = (popup) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popup.classList.add('popup_is-opened');
}

const openPopupImage = (popup, imgSrc, caption) => {
  popup.classList.add('popup_is-opened');
  popupImage.querySelector('.popup__image').src = imgSrc;
  popupImage.querySelector('.popup__caption').textContent = caption;
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
}

editBtn.addEventListener('click', () => openPopup(popupEdit));
addBtn.addEventListener('click', () => openPopup(popupNewCard));

cardBtn.forEach((card) => {
  const imgSrc = card.src
  const caption = card.parentElement.querySelector('.card__title').textContent
  card.addEventListener('click', () => openPopupImage(popupImage, imgSrc, caption));
});

closeBtn.forEach((close) => {
  close.addEventListener('click', () => closePopup(popupEdit));
  close.addEventListener('click', () => closePopup(popupNewCard));
  close.addEventListener('click', () => closePopup(popupImage));
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(event.target);
  }
}); 

const escKeyListener = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}
document.addEventListener('keydown', escKeyListener);

// Редактирование имени и информации о себе

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

// Добавление карточки

const cardSaveButton = popupNewCard.querySelector('.popup__button');

cardSaveButton.addEventListener('click', handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target.parentElement);

  const cardData = {
    name: formData.get('place-name'),
    link: formData.get('link')
  }

  const card = createCard(cardData, deleteCard);
  card.querySelector('.card__image').addEventListener('click', () => {
    openPopupImage(popupImage, cardData.link, cardData.name);
  })
  placesList.prepend(card);

  closePopup(popupNewCard);

  popupNewCard.querySelector('.popup__form').reset();
}

// Анимация попап

const popupAll = document.querySelectorAll('.popup');

popupAll.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

// Лайк

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

