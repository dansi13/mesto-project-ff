// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData) {
    const template = document.getElementById('card-template').content.querySelector('.card');
    const card = template.cloneNode(true);

    card.querySelector('.card__image').setAttribute('src', cardData['link']);
    card.querySelector('.card__title').innerHTML = cardData['name'];
    card.querySelector('.card__delete-button').addEventListener('click', () => {
        card.remove()
    });

    return card;
}

function renderCards(cardList) {
    for (let i = 0; i < cardList.length; i = i + 1) {
        const cardData = cardList[i];
        const card = createCard(cardData);
        
        document.querySelector('.places__list').append(card);
    }
}

renderCards(initialCards);