'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var i = 0;
var wizards = [];
var maxNumberName = WIZARD_NAMES.length - 1;
var maxNumberSurname = WIZARD_SURNAMES.length - 1;
var maxNumberCoatColor = COAT_COLOR.length - 1;
var maxNumberEyesColor = EYES_COLOR.length - 1;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };
}
var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
