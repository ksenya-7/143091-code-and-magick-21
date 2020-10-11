"use strict";

(() => {
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

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
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

  const onPopupEscPress = (evt) => {
    if (window.util.isEscape(evt) && evt.target !== setupUserName) {
      evt.preventDefault();
      setup.classList.add(`hidden`);
    }
  };

  const onPopupEnterPress = (evt) => {
    if (window.util.isEnter(evt) && evt.target === setupUserName) {
      evt.preventDefault();
      setup.classList.add(`hidden`);
    }
  };

  const openPopup = () => {
    setup.style.top = `80px`;
    setup.style.left = `50%`;
    setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
    document.addEventListener(`keydown`, onPopupEnterPress);
  };

  const closePopup = () => {
    setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    document.removeEventListener(`keydown`, onPopupEnterPress);
  };

  setupOpen.addEventListener(`click`, openPopup);

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, closePopup);

  setupClose.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      closePopup();
    }
  });

  const changeElementColor = (element, elementInput, colors) => {
    elementInput.value = window.util.getRandomFrom(colors);
    if (element.tagName.toLowerCase() === `div`) {
      element.style.backgroundColor = elementInput.value;
    } else {
      element.style.fill = elementInput.value;
    }
  };

  wizardCoat.addEventListener(`click`, () => {
    changeElementColor(wizardCoat, wizardCoatInput, COAT_COLORS);
  });

  wizardCoat.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      changeElementColor(wizardCoat, wizardCoatInput, COAT_COLORS);
    }
  });

  wizardEyes.addEventListener(`click`, () => {
    changeElementColor(wizardEyes, wizardEyesInput, EYE_COLORS);
  });

  wizardEyes.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      changeElementColor(wizardEyes, wizardEyesInput, EYE_COLORS);
    }
  });

  setupFireballWrap.addEventListener(`click`, () => {
    changeElementColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
  });

  setupFireballWrap.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      changeElementColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
    }
  });

  setup.classList.remove(`hidden`);
})();
