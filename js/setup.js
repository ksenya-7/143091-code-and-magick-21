'use strict';

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const firstNameSamples = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const secondNameSamples = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColorSamples = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const eyesColorSamples = [`black`, `red`, `blue`, `yellow`, `green`];

const WIZARD_LENGTH = 4;
const wizardRandoms = [];

const getWizardName = function (wizard) {
  let i = Math.floor(Math.random() * (firstNameSamples.length));
  let j = Math.floor(Math.random() * (secondNameSamples.length));
  wizard.name = firstNameSamples[i] + ` ` + secondNameSamples[j];
};

const getWizardCoat = function (wizard) {
  let i = Math.floor(Math.random() * (coatColorSamples.length));
  wizard.coatColor = coatColorSamples[i];
};

const getWizardEyes = function (wizard) {
  let i = Math.floor(Math.random() * (eyesColorSamples.length));
  wizard.eyesColor = eyesColorSamples[i];
};

for (let i = 0; i < WIZARD_LENGTH; i++) {
  let objectWisardRandom = {};

  getWizardName(objectWisardRandom);
  getWizardCoat(objectWisardRandom);
  getWizardEyes(objectWisardRandom);

  wizardRandoms.push(objectWisardRandom);
  objectWisardRandom = null;
}

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (let i = 0; i < wizardRandoms.length; i++) {
  similarListElement.appendChild(renderWizard(wizardRandoms[i]));
}

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
