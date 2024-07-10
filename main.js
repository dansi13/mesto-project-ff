/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   handleLikeClick: () => (/* binding */ handleLikeClick)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\nfunction deleteCard(card) {\n  card.remove();\n}\nfunction handleLikeClick(evt) {\n  evt.target.classList.toggle('card__like-button_is-active');\n}\nvar createCard = function createCard(cardData, onDeleteCard, onLikeCard, onOpenImagePopup) {\n  var card = _index_js__WEBPACK_IMPORTED_MODULE_0__.template.cloneNode(true);\n  var cardImage = card.querySelector('.card__image');\n  var deleteCardButton = card.querySelector('.card__delete-button');\n  var likeButton = card.querySelector('.card__like-button');\n  cardImage.src = cardData.link;\n  cardImage.alt = cardData.name;\n  card.querySelector('.card__title').textContent = cardData['name'];\n  cardImage.addEventListener('click', function () {\n    onOpenImagePopup(cardData);\n  });\n  deleteCardButton.addEventListener('click', function () {\n    return onDeleteCard(card);\n  });\n  likeButton.addEventListener('click', onLikeCard);\n  return card;\n};\n\n//# sourceURL=webpack://yandex_prektikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://yandex_prektikum/./src/components/cards.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closePopup: () => (/* binding */ closePopup),\n/* harmony export */   escKeyListener: () => (/* binding */ escKeyListener),\n/* harmony export */   handleOverlayClick: () => (/* binding */ handleOverlayClick),\n/* harmony export */   openPopup: () => (/* binding */ openPopup)\n/* harmony export */ });\nvar openPopup = function openPopup(popup) {\n  popup.classList.add('popup_is-opened');\n  document.addEventListener('keydown', escKeyListener);\n};\nvar closePopup = function closePopup(popup) {\n  popup.classList.remove('popup_is-opened');\n  document.removeEventListener('keydown', escKeyListener);\n};\nvar escKeyListener = function escKeyListener(event) {\n  if (event.key === \"Escape\") {\n    var openedPopup = document.querySelector('.popup_is-opened');\n    if (openedPopup) {\n      closePopup(openedPopup);\n    }\n  }\n};\nfunction handleOverlayClick(evt) {\n  if (evt.target.classList.contains('popup_is-opened')) {\n    closePopup(evt.target);\n  }\n}\n\n//# sourceURL=webpack://yandex_prektikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   jobInput: () => (/* binding */ jobInput),\n/* harmony export */   nameInput: () => (/* binding */ nameInput),\n/* harmony export */   profileJob: () => (/* binding */ profileJob),\n/* harmony export */   profileName: () => (/* binding */ profileName),\n/* harmony export */   template: () => (/* binding */ template)\n/* harmony export */ });\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ \"./src/styles/index.css\");\n/* harmony import */ var _components_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cards.js */ \"./src/components/cards.js\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/card.js */ \"./src/components/card.js\");\n// @todo: Темплейт карточки\n\n// @todo: DOM узлы\n\n// @todo: Функция создания карточки\n\n// @todo: Функция удаления карточки\n\n// @todo: Вывести карточки на страницу\n\n\n\n\n\n\n\n\n\n\n\n\nvar placesList = document.querySelector('.places__list');\nvar editBtn = document.querySelector('.profile__edit-button');\nvar addBtn = document.querySelector('.profile__add-button');\nvar closeBtnList = document.querySelectorAll('.popup__close');\nvar popupEdit = document.querySelector('.popup_type_edit');\nvar popupNewCard = document.querySelector('.popup_type_new-card');\nvar popupEditForm = popupEdit.querySelector('.popup__form');\nvar popupNewCardForm = popupNewCard.querySelector('.popup__form');\nvar popupImage = document.querySelector('.popup_type_image');\nvar cardSaveButton = popupNewCard.querySelector('.popup__button');\nvar popupAllList = document.querySelectorAll('.popup');\nvar profileName = document.querySelector('.profile__title');\nvar profileJob = document.querySelector('.profile__description');\nvar nameInput = document.querySelector('.popup__input_type_name');\nvar jobInput = document.querySelector('.popup__input_type_description');\nvar template = document.getElementById('card-template').content.querySelector('.card');\nfunction renderCards(cardList) {\n  for (var i = 0; i < cardList.length; i = i + 1) {\n    var cardData = cardList[i];\n    var card = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.deleteCard, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.handleLikeClick, cardClickHandler);\n    placesList.append(card);\n  }\n}\nrenderCards(_components_cards_js__WEBPACK_IMPORTED_MODULE_1__.initialCards);\nfunction handleProfileFormSubmit(evt) {\n  evt.preventDefault();\n  var nameValue = nameInput.value;\n  var jobValue = jobInput.value;\n  profileName.textContent = nameValue;\n  profileJob.textContent = jobValue;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupEdit);\n}\npopupEditForm.addEventListener('submit', handleProfileFormSubmit);\npopupNewCardForm.addEventListener('submit', handleCardFormSubmit);\nfunction handleCardFormSubmit(evt) {\n  evt.preventDefault();\n  var form = evt.target.closest('form');\n  var formData = new FormData(form);\n  var cardData = {\n    name: formData.get('place-name'),\n    link: formData.get('link')\n  };\n  var card = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.deleteCard, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.handleLikeClick, cardClickHandler);\n  placesList.prepend(card);\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupNewCard);\n  popupNewCard.querySelector('.popup__form').reset();\n}\npopupAllList.forEach(function (popup) {\n  popup.classList.add('popup_is-animated');\n});\nvar openPopupImage = function openPopupImage(popup, imgSrc, caption) {\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popup);\n  popupImage.querySelector('.popup__image').src = imgSrc;\n  popupImage.querySelector('.popup__image').alt = caption;\n  popupImage.querySelector('.popup__caption').textContent = caption;\n};\nfunction openProfilePopup() {\n  nameInput.value = profileName.textContent;\n  jobInput.value = profileJob.textContent;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupEdit);\n}\neditBtn.addEventListener('click', openProfilePopup());\naddBtn.addEventListener('click', function () {\n  return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupNewCard);\n});\nfunction cardClickHandler(cardData) {\n  var imgSrc = cardData.link;\n  var caption = cardData.name;\n  openPopupImage(popupImage, imgSrc, caption);\n}\ncloseBtnList.forEach(function (close) {\n  close.addEventListener('click', function () {\n    return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupEdit);\n  });\n  close.addEventListener('click', function () {\n    return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupNewCard);\n  });\n  close.addEventListener('click', function () {\n    return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupImage);\n  });\n});\npopupEdit.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);\npopupNewCard.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);\npopupImage.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_2__.handleOverlayClick);\n\n//# sourceURL=webpack://yandex_prektikum/./src/index.js?");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex_prektikum/./src/styles/index.css?");

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