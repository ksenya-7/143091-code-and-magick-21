"use strict";

const form = document.querySelector(`.setup-wizard-form`);

const submitHandler = (evt) => {
  window.backend.save(new FormData(form), () => {
    const setup = document.querySelector(`.setup`);
    setup.classList.add(`hidden`);
  });
  evt.preventDefault();
};

form.addEventListener(`submit`, submitHandler);
