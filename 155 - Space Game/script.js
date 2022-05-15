const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

// Background of Space
const space = {
  image: new Image(),
};

// An Alien
const alien = {
  image: new Image(),
  x: Math.random() * (canvas.width - 64),
  y: Math.random() * (canvas.width - 64),
  aliensCaught: 0,
  width: 60,
  height: 50,
};

// A Robot
const robot = {
  image: new Image(),
  x: 32,
  y: 232,
  speed: 10,
  width: 160,
  height: 150,
};

// A Small Planet with animation
const smallPlanet = {
  image: new Image(),
  x: 0,
};

// A Red Planet with animation
const redPlanet = {
  image: new Image(),
  i: 0,
  width: 80,
  height: 50,
};

// A Red Planet with animation
const blueAsteroid = {
  image: new Image(),
};

let sound = document.getElementById("sound");
// Reset the alien here
let reset = function () {
  alien.x = Math.random() * (canvas.width - 32);
  alien.y = Math.random() * (canvas.height - 32);
};

window.onload = function () {
  space.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1564469725/space-bg-01.png";
  smallPlanet.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1554025844/planet2_-_Copy.png";
  redPlanet.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1554025844/planet_-_Copy.png";
  robot.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1554183485/space-man.png";
  alien.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1554025845/alien.png";
  blueAsteroid.image.src =
    "https://res.cloudinary.com/dv3lue3qa/image/upload/v1554025844/rock-2_-_Copy.png";

  render();
  calc();
  reset();
};

// Small Planet Animation
function animateSmallPlanet() {
  let currentPosition = 0;

  //Looping the small planet
  if (Math.abs(smallPlanet.x) >= 650) {
    smallPlanet.x = -100;
  }
  smallPlanet.x += 1.51;
}

// Blue Asteroid
function rotateBlueAsteroid() {
  let time = new Date();
  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 9) * time.getSeconds() +
      ((2 * Math.PI) / 900) * time.getMilliseconds()
  );
  ctx.translate(0, 90.5);
  ctx.drawImage(blueAsteroid.image, 0.5, 0.5, 100, 70);
  ctx.restore();
}

function calc() {
  let soundEffect = true;
  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 40) {
      robot.y += 9;
    } else if (event.keyCode === 38) {
      robot.y -= 9;
    } else if (event.keyCode === 37) {
      robot.x -= 9;
    } else if (event.keyCode === 39) {
      robot.x += 9;
    }

    robot.x = Math.max(robot.x, 0);
    robot.y = Math.max(robot.y, 0);

    if (robot.x + robot.width > canvas.width) {
      robot.x = canvas.width - robot.width;
    }
    if (robot.y + robot.height > canvas.height) {
      robot.y = canvas.height - robot.height;
    }

    // If they are touching, let the alien appear randomly
    if (
      // Right edge of the alien is greater than or equal to the left edge  of the robot
      alien.x + alien.width >= robot.x &&
      // Left edge of the alien is less than or is equal to right edge of the robot
      alien.x <= robot.x + robot.width &&
      // Bottom edge of the alien is greater than or equal to the robot
      alien.y + alien.height >= robot.y &&
      // Top edge of the alien is less than or equal to bottom edge of the robot
      alien.y <= robot.y + robot.height
    ) {
      ++alien.aliensCaught;
      // Play Sound
      if (soundEffect) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
      }
      reset();
    }
  });
}

// Render Everything
function render() {
  requestAnimationFrame(render);
  // Drawing images

  ctx.drawImage(space.image, 0, 0, 700, 550);
  ctx.drawImage(smallPlanet.image, smallPlanet.x, 110, 50, 70);
  ctx.drawImage(redPlanet.image, 530, 280, redPlanet.width, redPlanet.height);
  ctx.drawImage(alien.image, alien.x, alien.y, alien.width, alien.height);
  ctx.drawImage(robot.image, robot.x, robot.y, robot.width, robot.height);

  //Drawing Score
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "24px Ariel";
  ctx.fillText("Aliens Caught: " + alien.aliensCaught, 260, 24);
  animateSmallPlanet();
  rotateBlueAsteroid();
}
