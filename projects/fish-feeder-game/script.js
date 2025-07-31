let score = 0;
let foodPellets = [];
let foodCount = 0;
let canDrop = true;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initiateScoreboard() {
  const scoreBoard = document.getElementById("score");

  setInterval(() => {
    countScores();
    scoreBoard.innerHTML = `Score: ${score}`;
  }, 200);
}

function startTimer(durationInSeconds) {
  const timerDisplay = document.getElementById("timer");
  let remaining = durationInSeconds;

  const countdown = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${remaining}s`;

    if (remaining <= 0) {
      clearInterval(countdown);
      endGame();
    }

    remaining--;
  }, 1000);
}

function endGame() {
  canDrop = false;

  foodPellets.forEach((pellet) => pellet.remove());
  foodPellets = [];

  alert(`⏰ Time's up! Your final score is ${score}.`);

  const restartBtn = document.getElementById("restartBtn");
  restartBtn.style.display = "block";
  restartBtn.addEventListener("click", () => location.reload());
}

function dropFood(x, y) {
  foodCount++; // Increment count for every pellet

  let foodPellet = document.createElement("div");
  foodPellet.className = "foodPellet";
  foodPellet.setAttribute("id", "foodPellet");

  foodPellet.style.left = x + "px";
  foodPellet.style.top = y + "px";

  // Mark every 10th pellet as "special"
  if (foodCount % 10 === 0) {
    foodPellet.classList.add("bigPellet");
    foodPellet.setAttribute("data-score", "20");
  } else {
    foodPellet.setAttribute("data-score", "10");
  }

  document.body.appendChild(foodPellet);
  foodPellets.push(foodPellet);

  let fallInterval = setInterval(function () {
    let currentTop = parseInt(foodPellet.style.top);
    if (currentTop > 650) {
      clearInterval(fallInterval);
      if (foodPellet.parentNode) {
        foodPellet.parentNode.removeChild(foodPellet);
      }
    } else {
      foodPellet.style.top = currentTop + 3 + "px";
    }
  }, 50);

  return foodPellet;
}

function dropFoodThrottled(x, y) {
  if (!canDrop) return;

  canDrop = false;

  dropFood(x, y);

  setTimeout(() => {
    canDrop = true;
  }, 500);
}

const swimFish = (fish) => {
  let directionX = getRandomInt(-1, 1);
  let directionY = getRandomInt(0, 1);
  let speed = getRandomInt(10, 25);

  const changeDirection = () => {
    directionX = getRandomInt(-1, 1);
    directionY = getRandomInt(-1, 1);
    speed = getRandomInt(10, 25);
  };

  // Change direction every 2-5 seconds
  setInterval(changeDirection, getRandomInt(2000, 5000));

  setInterval(function () {
    let fishCoords = fish.getBoundingClientRect();
    let currentLeft = parseInt(fish.style.left) || fishCoords.left;
    let currentTop = parseInt(fish.style.top) || fishCoords.top;

    let newLeft = currentLeft + directionX * speed;
    let newTop = currentTop + directionY * speed;

    if (newLeft < 0 || newLeft > 1140) {
      directionX = -directionX;
      newLeft = currentLeft + directionX * speed;
    }

    if (newTop < 100 || newTop > 600) {
      directionY = -directionY;
      newTop = currentTop + directionY * speed;
    }

    fish.style.left = newLeft + "px";
    fish.style.top = newTop + "px";

    if (directionX > 0) {
      fish.style.transform = "scaleX(1)";
    } else if (directionX < 0) {
      fish.style.transform = "scaleX(-1)";
    }
  }, 100);
};

function initializeFishPosition(fish) {
  fish.style.left = getRandomInt(100, 1000) + "px";
  fish.style.top = getRandomInt(150, 500) + "px";
}

function handleClicks() {
  document.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      dropFoodThrottled(event.pageX - 7, event.pageY - 7);
    },
    false
  );
}

function countScores() {
  const fishes = [
    document.getElementById("fish1"),
    document.getElementById("fish2"),
    document.getElementById("fish3"),
    document.getElementById("fish4"),
  ];

  const foodToKeep = [];

  for (let i = 0; i < foodPellets.length; i++) {
    let food = foodPellets[i];
    let foodRect = food.getBoundingClientRect();
    let isEaten = false;

    for (let fish of fishes) {
      let fishRect = fish.getBoundingClientRect();

      // Use bounding box collision check
      const overlap =
        foodRect.left < fishRect.right &&
        foodRect.right > fishRect.left &&
        foodRect.top < fishRect.bottom &&
        foodRect.bottom > fishRect.top;

      if (overlap) {
        let pelletScore = parseInt(food.getAttribute("data-score")) || 10;
        score += pelletScore;

        food.remove(); // remove from DOM
        isEaten = true;
        break; // no need to check other fishes
      }
    }

    if (!isEaten) {
      foodToKeep.push(food); // keep only uneaten pellets
    }
  }

  foodPellets = foodToKeep;
}

document.addEventListener("DOMContentLoaded", function () {
  handleClicks();
  initiateScoreboard();
  startTimer(120);

  let fish1 = document.getElementById("fish1");
  let fish2 = document.getElementById("fish2");
  let fish3 = document.getElementById("fish3");
  let fish4 = document.getElementById("fish4");

  initializeFishPosition(fish1);
  initializeFishPosition(fish2);
  initializeFishPosition(fish3);
  initializeFishPosition(fish4);

  swimFish(fish1);
  swimFish(fish2);
  swimFish(fish3);
  swimFish(fish4);
});
