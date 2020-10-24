'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

const debounce = (cb) => {
  let lastTimeout = null;

  return (...arg) => {
    const parameters = arg;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.debounce = debounce;

