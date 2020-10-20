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

  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizardsArray = [];

  const getRank = (element) => {
    let rank = 0;

    if (element.colorCoat === coatColor) {
      rank += 2;
    }
    if (element.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = () => {
    window.render.renderWizards(wizardsArray.sort((left, right) => {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  let wizard = {
    onEyesChange: window.debounce.debounce((color) => {
      eyesColor = color;
      updateWizards();
    }),
    onCoatChange: window.debounce.debounce((color) => {
      coatColor = color;
      updateWizards();
    })
  };

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
    element.style.backgroundColor = elementInput.value;
  };

  wizardCoat.addEventListener(`click`, () => {
    wizardCoatInput.value = window.util.getRandomFrom(COAT_COLORS);
    wizardCoat.style.fill = wizardCoatInput.value;
    const newColor = wizardCoatInput.value;
    wizard.onCoatChange(newColor);
  });

  wizardCoat.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      wizardCoatInput.value = window.util.getRandomFrom(COAT_COLORS);
      wizardCoat.style.fill = wizardCoatInput.value;
    }
    const newColor = wizardCoatInput.value;
    coatColor = newColor;
    // wizard.onCoatChange(newColor);
    updateWizards();
  });

  wizardEyes.addEventListener(`click`, () => {
    wizardEyesInput.value = window.util.getRandomFrom(EYE_COLORS);
    wizardEyes.style.fill = wizardEyesInput.value;
    const newColor = wizardEyesInput.value;
    wizard.onEyesChange(newColor);
  });

  wizardEyes.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      wizardEyesInput.value = window.util.getRandomFrom(EYE_COLORS);
      wizardEyes.style.fill = wizardEyesInput.value;
    }
    const newColor = wizardCoatInput.value;
    window.setup.coatColor = newColor;
    updateWizards();
  });

  setupFireballWrap.addEventListener(`click`, () => {
    changeElementColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
  });

  setupFireballWrap.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnter(evt)) {
      changeElementColor(setupFireball, setupFireballInput, FIREBALL_COLORS);
    }
  });

  const successHandler = (wizards) => {
    wizardsArray = wizards;
    updateWizards();
  };

  window.backend.load(successHandler, window.util.errorHandler);

  setup.classList.remove(`hidden`);
})();
