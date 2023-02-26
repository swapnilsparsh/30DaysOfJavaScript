/* global performance FPSMeter */
/* eslint-disable no-unused-vars */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getTime = typeof performance === 'function' ? performance.now : Date.now;
const FRAME_THRESHOLD = 300;
const FRAME_DURATION = 1000 / 58;
let then = getTime();
let acc = 0;
let animation;
let gameLoop;
for (const element of window.document.getElementsByTagName('link')) {
  if (element.href.includes('bootstrap')) {
    FPSMeter.theme.colorful.container.height = '40px';
    break;
  }
}
const meter = new FPSMeter({
  left: canvas.width - 130 + 'px',
  top: 'auto',
  bottom: '12px',
  theme: 'colorful',
  heat: 1,
  graph: 1
});

const label = {
  font: '30px Arial',
  color: '#FCFC06',
  margin: 40,
  left: 20,
  right: canvas.width - 160
};

const addPause = () => {
  document.addEventListener('keyup', e => {
    if (e.keyCode === 80) {
      if (animation === undefined) {
        animation = window.requestAnimationFrame(gameLoop);
      } else {
        window.cancelAnimationFrame(animation);
        animation = undefined;
      }
    }
  });
};

const addResize = () => {
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};

const loop = gameLogic => {
  const now = getTime();
  const ms = now - then;
  let frames = 0;
  then = now;
  if (ms < FRAME_THRESHOLD) {
    acc += ms;
    while (acc >= FRAME_DURATION) {
      frames++;
      acc -= FRAME_DURATION;
    }
  }
  meter.tick();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameLogic(frames);
  if (gameLoop === undefined) {
    gameLoop = () => {
      loop(gameLogic);
    };
  }
  animation = window.requestAnimationFrame(gameLoop);
};

const drawCircle = (x, y, radius) => {
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
};

const paintCircle = (x, y, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  drawCircle(x, y, radius);
  ctx.fill();
};

const drawLine = (x1, y1, x2, y2) => {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
};

const paintLine = (x1, y1, x2, y2, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  drawLine(x1, y1, x2, y2);
  ctx.stroke();
};

const drawRoundRect = (x, y, width, height, arcX, arcY) => {
  ctx.moveTo(x + arcX, y);
  ctx.lineTo(x + width - arcX, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + arcY);
  ctx.lineTo(x + width, y + height - arcY);
  ctx.quadraticCurveTo(x + width, y + height, x + width - arcX, y + height);
  ctx.lineTo(x + arcX, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - arcY);
  ctx.lineTo(x, y + arcY);
  ctx.quadraticCurveTo(x, y, x + arcX, y);
};

const paintRoundRect = (x, y, width, height, arcX, arcY, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  drawRoundRect(x, y, width, height, arcX, arcY);
  ctx.fill();
};

const isIntersectingRectangleWithRectangle = (rect1, width1, height1, rect2, width2, height2) => {
  return rect2.x < rect1.x + width1 && rect2.x + width2 > rect1.x && rect2.y < rect1.y + height1 && rect2.y + height2 > rect1.y;
};

const isIntersectingRectangleWithCircle = (rect, width, height, circle, radius) => {
  const distX = Math.abs(circle.x - rect.x - width / 2);
  const distY = Math.abs(circle.y - rect.y - height / 2);
  if (distX > (width / 2 + radius) || distY > (height / 2 + radius)) {
    return false;
  }
  if (distX <= (width / 2) || distY <= (height / 2)) {
    return true;
  }
  const dX = distX - width / 2;
  const dY = distY - height / 2;
  return dX ** 2 + dY ** 2 <= radius ** 2;
};

const getDistance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const generateRandomNumber = (min, max) => {
  return min + Math.random() * (max - min);
};

const generateRandomInteger = range => {
  return Math.floor(Math.random() * range);
};

const generateRandomRgbColor = () => {
  return [generateRandomInteger(255), generateRandomInteger(255), generateRandomInteger(255)];
};

const generateRandomCharCode = (caseSensitive) => {
  const codes = [];
  if (caseSensitive) {
    for (let i = 0; i < 26; i++) {
      codes.push(65 + i);
    }
  }
  for (let i = 0; i < 26; i++) {
    codes.push(97 + i);
  }
  return codes[generateRandomInteger(codes.length)];
};