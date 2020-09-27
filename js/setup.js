'use strict';

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_LENGTH = 4;
const wizards = [];

const getRandomNumber = (arr) => Math.floor(Math.random() * (arr.length));

const getWizardName = () => NAMES[getRandomNumber(NAMES)] + ` ` + LAST_NAMES[getRandomNumber(LAST_NAMES)];

const getRandomFrom = (colors) => colors[getRandomNumber(COAT_COLORS)];

for (let i = 0; i < WIZARD_LENGTH; i++) {
  wizards.push({
    name: getWizardName(),
    coatColor: getRandomFrom(COAT_COLORS),
    eyesColor: getRandomFrom(EYE_COLORS)
  });
}

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizards = (elements) => {
  const fragment = document.createDocumentFragment();

  elements.map(renderWizard).forEach((element) => fragment.append(element));

  return fragment;
};

similarListElement.appendChild(renderWizards(wizards));

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
