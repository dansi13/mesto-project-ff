export const initialCards = [
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

export function createCard(cardData, deleteCallback, likeCallback) {
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

export function deleteCard(card) {
  card.remove();
}

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

