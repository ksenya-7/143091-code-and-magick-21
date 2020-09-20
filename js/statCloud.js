"use strict";

// const SHIFT = 10;

const FONT_STYLE = `16px PT Mono`;

const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;

const GAP = 50;

const CloudOptions = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270
};

const ColorUsed = {
  GRAY: `hsl(0, 0%, 30%)`,
  WHITE: `hsl(0, 0%, 100%)`,
  BLACK: `hsl(0, 0%, 0%)`,
  YOU: `hsl(0, 100%, 50%)`
};

const Message = {
  YOU_WON: `Ура вы победили!`,
  RESULTS: `Список результатов:`
};

const renderCloud = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(100, 90);
  ctx.bezierCurveTo(100, 90, 34, 140, 105, 192);
  ctx.bezierCurveTo(105, 192, 100, 332, 317, 270);
  ctx.bezierCurveTo(317, 270, 530, 340, 500, 175);
  ctx.bezierCurveTo(500, 175, 560, 75, 465, 60);
  ctx.bezierCurveTo(465, 60, 382, -30, 245, 20);
  ctx.bezierCurveTo(245, 20, 95, -40, 100, 90);
  ctx.closePath();
  ctx.fill();
};

const getGreeting = (ctx) => {
  ctx.fillStyle = ColorUsed.BLACK;
  ctx.font = FONT_STYLE;
  ctx.fillText(Message.YOU_WON, CloudOptions.X + 20, CloudOptions.Y + 30);
  ctx.fillText(Message.RESULTS, CloudOptions.X + 20, CloudOptions.Y + 50);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const maxTime = function (tick) {
  return getMaxElement(tick);
};

const margin = function (names) {
  return (CloudOptions.WIDTH - names.length * BAR_WIDTH - (names.length - 1) * GAP) / 2;
};

const getRect = function (ctx, name, names, time, times, j) {
  const getRandom = function (min, max) {
    return Math.floor(Math.random() * max) - min + 1;
  };

  const getRandomColor = function () {
    return `hsl(240, ` + getRandom(0, 100) + `%, 50%)`;
  };

  ctx.fillStyle = name === `Вы`
    ? `hsl(0, 100%, 50%)`
    : getRandomColor();

  ctx.fillRect(
      CloudOptions.X + margin(names) + (GAP + BAR_WIDTH) * j,
      CloudOptions.HEIGHT - 30,
      BAR_WIDTH,
      -(BAR_MAX_HEIGHT * time) / maxTime(times)
  );
};

const getText = function (ctx, name, names, time, times, j) {
  ctx.fillStyle = ColorUsed.BLACK;

  ctx.fillText(
      name,
      CloudOptions.X + margin(names) + (GAP + BAR_WIDTH) * j,
      CloudOptions.HEIGHT - 10
  );
  ctx.fillText(
      Math.round(time),
      CloudOptions.X + margin(names) + (GAP + BAR_WIDTH) * j,
      BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * time) / maxTime(times) + 80
  );
};

const getResults = function (ctx, names, times) {
  for (let j = 0; j < names.length; j++) {
    getText(ctx, names[j], names, times[j], times, j);
    getRect(ctx, names[j], names, times[j], times, j);
  }
};

window.renderStatistics = function (ctx, names, times) {
  ctx.translate(10, 10);
  renderCloud(ctx, ColorUsed.GRAY);
  ctx.translate(-10, -10);
  renderCloud(ctx, ColorUsed.WHITE);
  getGreeting(ctx);
  getResults(ctx, names, times);
};
