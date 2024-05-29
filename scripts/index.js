// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData, deleteCallback) {
    const template = document.getElementById('card-template').content.querySelector('.card');
    const card = template.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData['name'];
    card.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCallback(card)
    });

    return card;
}

function renderCards(cardList) {
    const placesList = document.querySelector('.places__list');

    for (let i = 0; i < cardList.length; i = i + 1) {
        const cardData = cardList[i];
        const card = createCard(cardData, deleteCard);
        
        placesList.append(card);
    }
}

function deleteCard(card) {
    card.remove();
}

renderCards(initialCards);