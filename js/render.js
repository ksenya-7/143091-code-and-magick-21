"use strict";

const WIZARDS_AMOUNT = 4;

const similarListElement = document.querySelector(`.setup-similar-list`);
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

const renderWizards = (wizards) => {
  const fragment = document.createDocumentFragment();
  const quantity = wizards.length < WIZARDS_AMOUNT ? wizards.length : WIZARDS_AMOUNT;

  similarListElement.innerHTML = ``;
  for (let i = 0; i < quantity; i++) {
    fragment.append(renderWizard(wizards[i]));
  }

  similarListElement.append(fragment);
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

window.renderWizards = renderWizards;
