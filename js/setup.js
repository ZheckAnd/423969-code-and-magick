'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIRE_BALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var wizards = [];
var isFormInFocus;

// Рандом;

var getRandomItem = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var getRandom = function () {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return arr[getRandom()];
};

// Создать массив волшебников;

var createWisard = function () {
  for (var j = 0; j <= 3; j++) {
    wizards[j] =
   {
     'name': getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
     'coatColor': getRandomItem(COAT_COLOR),
     'eyesColor': getRandomItem(EYES_COLOR)
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
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!isFormInFocus) {
      closeUserDialog();
    }
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  mineWizardCoat.addEventListener('click', getMineWizardCoatColor);
  mineWizardEyes.addEventListener('click', getMineWizardEyesColor);
  mineWizardFireBall.addEventListener('click', getMineWizardFireBall);
};
var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  mineWizardCoat.removeEventListener('click', getMineWizardCoatColor);
  mineWizardEyes.removeEventListener('click', getMineWizardEyesColor);
  mineWizardFireBall.removeEventListener('click', getMineWizardFireBall);
};

setupOpen.addEventListener('click', function () {
  openUserDialog();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

setupClose.addEventListener('click', function () {
  closeUserDialog();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

// Новое задание;
var mineWizard = document.querySelector('.setup-wizard');
var mineWizardCoat = mineWizard.querySelector('.wizard-coat');

// изменение цвета плаща;
var getMineWizardCoatColor = function () {
  mineWizardCoat.style.fill = getRandomItem(COAT_COLOR);
};

// изменение цвета глаз;
var mineWizardEyes = mineWizard.querySelector('.wizard-eyes');
var getMineWizardEyesColor = function () {
  mineWizardEyes.style.fill = getRandomItem(EYES_COLOR);
};

// изменение цвета фаерболла;
var mineWizardFireBall = document.querySelector('.setup-fireball-wrap');
var getMineWizardFireBall = function () {
  mineWizardFireBall.style.backgroundColor = getRandomItem(FIRE_BALL_COLOR);
};


createWisard();
getFragment();
