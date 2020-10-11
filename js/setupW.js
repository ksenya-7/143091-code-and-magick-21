"use strict";

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
];
const LAST_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARDS_AMOUNT = 4;

const setup = document.querySelector(`.setup`);
const similarListElement = setup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document
  .querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);


const generateWizards = (amount) => {
  return new Array(amount).fill(``).map(() => ({
    name: window.util.getRandomFrom(NAMES) + ` ` + window.util.getRandomFrom(LAST_NAMES),
    coatColor: window.util.getRandomFrom(COAT_COLORS),
    eyesColor: window.util.getRandomFrom(EYE_COLORS),
  }));
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizards = (wizards) => {
  const fragment = document.createDocumentFragment();

  wizards.map(renderWizard).forEach((element) => fragment.append(element));

  return fragment;
};

const wizards = generateWizards(WIZARDS_AMOUNT);
similarListElement.append(renderWizards(wizards));
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
