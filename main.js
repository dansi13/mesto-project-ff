/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/api.js":
/*!*******************************!*\
  !*** ./src/components/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCard: () => (/* binding */ addCard),
/* harmony export */   addLike: () => (/* binding */ addLike),
/* harmony export */   deleteCard: () => (/* binding */ deleteCard),
/* harmony export */   getInitialCards: () => (/* binding */ getInitialCards),
/* harmony export */   getUserInfo: () => (/* binding */ getUserInfo),
/* harmony export */   removeLike: () => (/* binding */ removeLike),
/* harmony export */   updateAvatar: () => (/* binding */ updateAvatar),
/* harmony export */   updateUserInfo: () => (/* binding */ updateUserInfo)
/* harmony export */ });
var config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '8f707c9b-b44e-4e6e-844f-36192e6b90e3',
    'Content-Type': 'application/json'
  }
};
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
}

// Получение данных пользователя
var getUserInfo = function getUserInfo() {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    headers: config.headers
  }).then(checkResponse);
};

// Обновление данных пользователя
var updateUserInfo = function updateUserInfo(name, about) {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(checkResponse);
};

// Обновление аватара пользователя
var updateAvatar = function updateAvatar(avatarUrl) {
  return fetch("".concat(config.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(checkResponse);
};

// Получение карточек
var getInitialCards = function getInitialCards() {
  return fetch("".concat(config.baseUrl, "/cards"), {
    headers: config.headers
  }).then(checkResponse);
};

// Добавление новой карточки
var addCard = function addCard(name, link) {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(checkResponse);
};

// Удаление карточки
var addLike = function addLike(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: config.headers
  }).then(checkResponse);
};
var removeLike = function removeLike(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};
var deleteCard = function deleteCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};

/***/ }),

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCard: () => (/* binding */ createCard)
/* harmony export */ });
/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/api.js */ "./src/components/api.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./src/index.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.js */ "./src/components/modal.js");



var createCard = function createCard(cardData, userId, _ref) {
  var deleteCard = _ref.deleteCard,
    addLike = _ref.addLike,
    handleImageClick = _ref.handleImageClick;
  var cardTemplate = document.getElementById('card-template').content;
  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  var cardImage = cardElement.querySelector('.card__image');
  var cardTitle = cardElement.querySelector('.card__title');
  var likeButton = cardElement.querySelector('.card__like-button');
  var likeCount = cardElement.querySelector('.card__like-counter');
  var deleteButton = cardElement.querySelector('.card__delete-button');
  var imgSrc = cardData.link;
  var caption = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  if (cardData.likes && cardData.likes.some(function (like) {
    return like._id === userId;
  })) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.removeLike)(cardData._id).then(function (updatedCard) {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        return console.error(err);
      });
    } else {
      addLike(cardData._id).then(function (updatedCard) {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        return console.error(err);
      });
    }
  });
  cardImage.addEventListener('click', function () {
    handleImageClick(imgSrc, caption);
  });
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.classList.add('card__delete-button_is-active');
  }
  deleteButton.addEventListener('click', function () {
    deleteCard(cardData._id).then(function () {
      cardElement.remove();
    }).catch(function (err) {
      return console.error(err);
    });
  });
  return cardElement;
};

/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialCards: () => (/* binding */ initialCards)
/* harmony export */ });
var initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}];

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closePopup: () => (/* binding */ closePopup),
/* harmony export */   escKeyListener: () => (/* binding */ escKeyListener),
/* harmony export */   handleOverlayClick: () => (/* binding */ handleOverlayClick),
/* harmony export */   openPopup: () => (/* binding */ openPopup)
/* harmony export */ });
var openPopup = function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escKeyListener);
};
var closePopup = function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyListener);
};
var escKeyListener = function escKeyListener(event) {
  if (event.key === "Escape") {
    var openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

/***/ }),

/***/ "./src/components/validation.js":
/*!**************************************!*\
  !*** ./src/components/validation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearValidation: () => (/* binding */ clearValidation),
/* harmony export */   enableValidation: () => (/* binding */ enableValidation),
/* harmony export */   hideInputError: () => (/* binding */ hideInputError)
/* harmony export */ });
function showInputError(formElement, inputElement, errorMessage, settings) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}
function hideInputError(formElement, inputElement, settings) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}
function checkInputValidity(formElement, inputElement, settings) {
  var errorMessage = inputElement.dataset.errorMessage;
  var pattern = inputElement.getAttribute('pattern');
  if (pattern && !new RegExp(pattern).test(inputElement.value)) {
    inputElement.setCustomValidity(errorMessage || "Неверный формат ввода");
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function setEventListeners(formElement, settings) {
  var inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  var buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}
function enableValidation(settings) {
  var formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}
function clearValidation(formElement, settings) {
  var inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  var buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, settings);
  });
  toggleButtonState(inputList, buttonElement, settings);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _components_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cards.js */ "./src/components/cards.js");
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/modal.js */ "./src/components/modal.js");
/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/card.js */ "./src/components/card.js");
/* harmony import */ var _components_validation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/validation.js */ "./src/components/validation.js");
/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/api.js */ "./src/components/api.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу










var placesList = document.querySelector('.places__list');
var editBtn = document.querySelector('.profile__edit-button');
var addBtn = document.querySelector('.profile__add-button');
var closeBtnList = document.querySelectorAll('.popup__close');
var popupEdit = document.querySelector('.popup_type_edit');
var popupNewCard = document.querySelector('.popup_type_new-card');
var popupEditForm = popupEdit.querySelector('.popup__form');
var popupNewCardForm = popupNewCard.querySelector('.popup__form');
var popupImage = document.querySelector('.popup_type_image');
var cardSaveButton = popupNewCard.querySelector('.card-form__submit-button');
var popupAllList = document.querySelectorAll('.popup');
var profileName = document.querySelector('.profile__title');
var profileJob = document.querySelector('.profile__description');
var nameInput = document.querySelector('.popup__input_type_name');
var jobInput = document.querySelector('.popup__input_type_description');
var template = document.getElementById('card-template').content.querySelector('.card');
var avatarPopup = document.querySelector('.popup_type_avatar');
var avatarForm = avatarPopup.querySelector('.popup__form');
var avatarInput = avatarForm.querySelector('input[name="avatar"]');
var avatarSaveButton = avatarForm.querySelector('.popup__button_avatar');
var profileImage = document.querySelector('.profile__image');
var profileSaveButton = popupEditForm.querySelector('.profile-form__submit-button');
var image = popupImage.querySelector('.popup__image');
var imageCaption = popupImage.querySelector('.popup__caption');
var closeButtons = document.querySelectorAll('.popup__close');
var userId;
var settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_4__.enableValidation)(settings);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  var nameValue = nameInput.value;
  var jobValue = jobInput.value;
  profileSaveButton.textContent = 'Сохранение...';
  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_5__.updateUserInfo)(nameValue, jobValue).then(function (userData) {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupEdit);
  }).catch(function (err) {
    console.error(err);
  }).finally(function () {
    profileSaveButton.textContent = 'Сохранить';
  });
}
popupEditForm.addEventListener('submit', handleProfileFormSubmit);
popupNewCardForm.addEventListener('submit', handleCardFormSubmit);
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  var form = evt.target.closest('form');
  var formData = new FormData(form);
  var cardData = {
    name: formData.get('place-name'),
    link: formData.get('link')
  };
  cardSaveButton.textContent = 'Сохранение...';
  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_5__.addCard)(cardData.name, cardData.link).then(function (cardData) {
    var cardElement = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, userId, {
      deleteCard: _components_api_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard,
      addLike: _components_api_js__WEBPACK_IMPORTED_MODULE_5__.addLike,
      handleImageClick: openPopupImage
    });
    placesList.prepend(cardElement);
    form.reset();
    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupNewCard);
    (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_4__.clearValidation)(popupNewCardForm, settings);
  }).catch(function (err) {
    console.error(err);
  }).finally(function () {
    cardSaveButton.textContent = 'Создать';
  });
}
popupAllList.forEach(function (popup) {
  popup.classList.add('popup_is-animated');
});
var openPopupImage = function openPopupImage(imgSrc, caption) {
  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupImage);
  image.src = imgSrc;
  image.alt = caption;
  imageCaption.textContent = caption;
};
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_4__.clearValidation)(popupEditForm, settings);
  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupEdit);
}
editBtn.addEventListener('click', function () {
  return openProfilePopup();
});
addBtn.addEventListener('click', function () {
  return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupNewCard);
});
closeButtons.forEach(function (button) {
  var popup = button.closest('.popup');
  button.addEventListener('click', function () {
    return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popup);
  });
});
popupEdit.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);
popupNewCard.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);
popupImage.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);
avatarPopup.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);
document.addEventListener('DOMContentLoaded', function () {
  Promise.all([(0,_components_api_js__WEBPACK_IMPORTED_MODULE_5__.getUserInfo)(), (0,_components_api_js__WEBPACK_IMPORTED_MODULE_5__.getInitialCards)()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      userData = _ref2[0],
      initialCards = _ref2[1];
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = "url(".concat(userData.avatar, ")");
    initialCards.forEach(function (cardData) {
      var cardElement = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, userId, {
        deleteCard: _components_api_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard,
        addLike: _components_api_js__WEBPACK_IMPORTED_MODULE_5__.addLike,
        handleImageClick: openPopupImage
      });
      placesList.append(cardElement);
    });
  }).catch(function (err) {
    console.error(err);
  });
});

// Открытие попапа для редактирования аватар

profileImage.addEventListener('click', function () {
  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(avatarPopup);
});
avatarForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var avatarUrl = avatarInput.value;
  avatarSaveButton.textContent = 'Сохранение...';
  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_5__.updateAvatar)(avatarUrl).then(function (userData) {
    profileImage.style.backgroundImage = "url(".concat(userData.avatar, ")");
    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(avatarPopup);
  }).catch(function (err) {
    console.error(err);
  }).finally(function () {
    avatarSaveButton.textContent = 'Сохранить';
  });
});

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map