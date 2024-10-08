import { addLike, removeLike, deleteCard } from "../components/api.js";
import { openPopupImage } from "../index.js";
import { openPopup } from "./modal.js";

    export const createCard = (cardData, userId, {deleteCard, addLike, handleImageClick}) => {
        const cardTemplate = document.getElementById('card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        const likeButton = cardElement.querySelector('.card__like-button');
        const likeCount = cardElement.querySelector('.card__like-counter');
        const deleteButton = cardElement.querySelector('.card__delete-button');
        const imgSrc = cardData.link
        const caption = cardData.name
      
        cardTitle.textContent = cardData.name;
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        likeCount.textContent = cardData.likes.length
        
      
        if (cardData.likes && cardData.likes.some(like => like._id === userId)) {
          likeButton.classList.add('card__like-button_is-active');
        }
      
        likeButton.addEventListener('click', () => {
          if (likeButton.classList.contains('card__like-button_is-active')) {
            removeLike(cardData._id)
              .then((updatedCard) => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
              })
              .catch((err) => console.error(err));
          } else {
            addLike(cardData._id)
              .then((updatedCard) => {
                likeButton.classList.add('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
              })
              .catch((err) => console.error(err));
          }
        });

        cardImage.addEventListener('click', () => {
            handleImageClick(imgSrc, caption);
        });
      
        if (cardData.owner._id !== userId) {
          deleteButton.remove();
        } else {
          deleteButton.classList.add('card__delete-button_is-active');
        }
        deleteButton.addEventListener('click', () => {
          deleteCard(cardData._id)
            .then(() => {
              cardElement.remove();
            })
            .catch((err) => console.error(err));
        });
      
        return cardElement;
      };