import { template } from "../index.js";

export function deleteCard(card) {
    card.remove();
}

export function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export const createCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup) => {
    const card = template.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const deleteCardButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData['name'];
    cardImage.addEventListener('click', () => {    
        onOpenImagePopup(cardData); 
    });
    
    deleteCardButton.addEventListener('click', () => onDeleteCard(card));              
    
    likeButton.addEventListener('click', onLikeCard);
    
    return card;
    }