"use strict";

(() => {
  const Key = {
    ESCAPE: `Escape`,
    ENTER: `Enter`,
  };

  const isEscape = (evt) => (evt.key === Key.ESCAPE);
  const isEnter = (evt) => (evt.key === Key.ENTER);

  const getRandom = (min, max) =>
    Math.floor(min + Math.random() * (max + 1 - min));

  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

  const errorHandler = (message) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center;`;
    node.style.position = `absolute`;
    node.style.top = `25px`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `27px`;
    node.style.color = `red`;
    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    isEscape,
    isEnter,
    getRandom,
    getRandomFrom,
    errorHandler
  };
})();
