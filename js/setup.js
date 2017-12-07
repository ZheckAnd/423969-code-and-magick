'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// userDialog.classList.remove('hidden');


var i = 0;
var wizards = [];
var maxNumberName = WIZARD_NAMES.length - 1;
var maxNumberSurname = WIZARD_SURNAMES.length - 1;
var maxNumberCoatColor = COAT_COLOR.length - 1;
var maxNumberEyesColor = EYES_COLOR.length - 1;

// Рандом;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создать массив волшебников;

var createWisard = function () {
  for (var j = 0; j <= 3; j++) {
    var randomName = getRandomInt(i, maxNumberName);
    var randomSurname = getRandomInt(i, maxNumberSurname);
    var randomCoatColor = getRandomInt(i, maxNumberCoatColor);
    var randomEyesColor = getRandomInt(i, maxNumberEyesColor);

    wizards[j] =
    {
      'name': WIZARD_NAMES[randomName] + ' ' + WIZARD_SURNAMES[randomSurname],
      'coatColor': COAT_COLOR[randomCoatColor],
      'eyesColor': EYES_COLOR[randomEyesColor]
    };
  }
};

// Создать DOM-элемент с волшебником;

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Вставить похожих волшебников;

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

createWisard();
getFragment();


var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var onPopupEscPress = function (evt) {
  // if (document.querySelector('.setup-user-name')) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
