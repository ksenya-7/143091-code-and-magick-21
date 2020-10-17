"use strict";

const WIZARDS_AMOUNT = 4;

const setup = document.querySelector(`.setup`);
const similarListElement = setup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document
  .querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

  return wizardElement;
};

const successHandler = (wizards) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_AMOUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.append(fragment);
  setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

window.backend.load(successHandler, window.util.errorHandler);
