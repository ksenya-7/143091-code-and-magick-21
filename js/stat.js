"use strict";

const SHIFT = 10;

const FONT_STYLE = `16px PT Mono`;
const BASELINE_HANGING = `hanging`;

const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;

const GAP = 50;

const CloudOptions = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270
};

const Color = {
  GRAY: `hsl(0, 0%, 30%)`,
  WHITE: `hsl(0, 0%, 100%)`,
  BLACK: `hsl(0, 0%, 0%)`,
  YOU: `hsl(0, 100%, 50%)`
};

const Message = {
  YOU_WON: `Ура вы победили!`,
  RESULTS: `Список результатов:`
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CloudOptions.WIDTH, CloudOptions.HEIGHT);
};

const renderClouds = (ctx) => {
  renderCloud(ctx, CloudOptions.X + SHIFT, CloudOptions.Y + SHIFT, Color.GRAY);
  renderCloud(ctx, CloudOptions.X, CloudOptions.Y, Color.WHITE);
};

const renderGreeting = (ctx) => {
  ctx.fillStyle = Color.BLACK;
  ctx.font = FONT_STYLE;
  ctx.textBaseline = BASELINE_HANGING;

  ctx.fillText(Message.YOU_WON, CloudOptions.X + SHIFT * 2, CloudOptions.Y + SHIFT * 2);
  ctx.fillText(Message.RESULTS, CloudOptions.X + SHIFT * 2, CloudOptions.Y + SHIFT * 4);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getMargin = (names) => (CloudOptions.WIDTH - names.length * BAR_WIDTH - (names.length - 1) * GAP) / 2;

const getRandom = (min, max) => Math.floor(Math.random() * max) - min + 1;

const getRandomColor = () => `hsl(240, ` + getRandom(0, 100) + `%, 50%)`;

const getRectColor = (name) =>
  name === `Вы`
    ? `hsl(0, 100%, 50%)`
    : getRandomColor();

const getRect = (ctx, name, names, time, times, i) => {

  ctx.fillStyle = getRectColor(name);

  ctx.fillRect(
      CloudOptions.X + getMargin(names) + (GAP + BAR_WIDTH) * i,
      CloudOptions.HEIGHT - SHIFT * 3,
      BAR_WIDTH,
      -(BAR_MAX_HEIGHT * time) / getMaxElement(times)
  );
};

const renderNameAndScore = (ctx, name, names, time, times, i) => {
  ctx.fillStyle = Color.BLACK;
  ctx.textBaseline = BASELINE_HANGING;

  ctx.fillText(
      name,
      CloudOptions.X + getMargin(names) + (GAP + BAR_WIDTH) * i,
      CloudOptions.HEIGHT - SHIFT * 2
  );
  ctx.fillText(
      Math.round(time),
      CloudOptions.X + getMargin(names) + (GAP + BAR_WIDTH) * i,
      BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * time) / getMaxElement(times) + SHIFT * 7
  );
};

const renderResults = (ctx, names, times) => {
  for (let i = 0; i < names.length; i++) {
    renderNameAndScore(ctx, names[i], names, times[i], times, i);
    getRect(ctx, names[i], names, times[i], times, i);
  }
};

window.renderStatistics = (ctx, names, times) => {
  renderClouds(ctx);
  renderGreeting(ctx);
  renderResults(ctx, names, times);
};
