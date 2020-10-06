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
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARDS_AMOUNT = 4;

const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document
  .querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);


const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const setupWizard = setup.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const wizardCoatInput = setup.querySelector(`[name="coat-color"]`);
const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const wizardEyesInput = setup.querySelector(`[name="eyes-color"]`);
const setupFireballWrap = setup.querySelector(`.setup-fireball-wrap`);
const setupFireball = setupFireballWrap.querySelector(`.setup-fireball`);
const setupFireballInput = setupFireballWrap.querySelector(`input`);

const getRandom = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const generateWizards = (amount) => {
  return new Array(amount).fill(``).map(() => ({
    name: getRandomFrom(NAMES) + ` ` + getRandomFrom(LAST_NAMES),
    coatColor: getRandomFrom(COAT_COLORS),
    eyesColor: getRandomFrom(EYE_COLORS),
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

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && evt.target !== setupUserName || evt.key === `Enter` && evt.target === setupUserName) {
    evt.preventDefault();
    setup.classList.add(`hidden`);
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, openPopup);

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, closePopup);

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

const changeElementColor = (element, elementInput, colors) => {
  elementInput.value = getRandomFrom(colors);
  element.style.fill = elementInput.value;
};

wizardCoat.addEventListener(`click`, () => {
  changeElementColor(wizardCoat, wizardCoatInput, COAT_COLORS);
});

wizardCoat.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    changeElementColor(wizardCoat, wizardCoatInput, COAT_COLORS);
  }
});

wizardEyes.addEventListener(`click`, () => {
  changeElementColor(wizardEyes, wizardEyesInput, EYE_COLORS);
});

wizardEyes.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    changeElementColor(wizardEyes, wizardEyesInput, EYE_COLORS);
  }
});

const changeElementBackgroundColor = (element, elementInput, colors) => {
  elementInput.value = getRandomFrom(colors);
  element.style.backgroundColor = elementInput.value;
};

setupFireballWrap.addEventListener(`click`, () => {
  changeElementBackgroundColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
});

setupFireballWrap.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    changeElementBackgroundColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
  }
});

const wizards = generateWizards(WIZARDS_AMOUNT);
similarListElement.append(renderWizards(wizards));
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
userDialog.classList.remove(`hidden`);
