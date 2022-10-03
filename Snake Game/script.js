import {
  snakeSpeed,
  update as updateSnake,
  draw as drawSnake,
  snakeIntersection,
  getSnakeHead,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameover = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameover) {
    if (confirm("You lost. Restart the game?")) {
      window.location = "https://keshab0100.github.io/SnakeGame/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  let secondSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = currentTime;
  draw();
  update();
}
window.requestAnimationFrame(main);
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
function update() {
  updateSnake();
  updateFood();
  checkDeath();
}
function checkDeath() {
  gameover = outsideGrid(getSnakeHead()) || snakeIntersection();
}
