"use strict";

(() => {
  const setup = document.querySelector(`.setup`);
  const form = setup.querySelector(`.setup-wizard-form`);

  const submitHandler = (evt) => {
    window.backend.save(new FormData(form), () => {
      setup.classList.add(`hidden`);
    });
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);
})();
