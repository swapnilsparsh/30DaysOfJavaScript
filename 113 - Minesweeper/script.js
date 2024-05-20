const boardSize = 10;
const totalMines = 20;
let mines = [];
let revealedCells = 0;
let points = 0;

function initializeBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  generateMines();
}

function generateMines() {
  mines = Array.from({ length: totalMines }, () =>
    Math.floor(Math.random() * (boardSize * boardSize))
  );
}

function handleCellClick(event) {
  const clickedIndex = parseInt(event.target.getAttribute("data-index"));
  const cell = document.querySelector(`.cell[data-index="${clickedIndex}"]`);

  if (!cell.classList.contains("revealed")) {
    if (mines.includes(clickedIndex)) {
      revealMines();
      alert("Game Over! You hit a mine.");
    } else {
      revealCell(clickedIndex);
      points++;
      updatePoints();
      if (revealedCells === boardSize * boardSize - totalMines) {
        alert("Congratulations! You won!");
      }
    }
  }
}

function revealMines() {
  mines.forEach((index) => {
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add("mine");
  });
}

function revealCell(index) {
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  if (!cell.classList.contains("revealed")) {
    cell.classList.add("revealed");
    revealedCells++;

    const mineCount = countAdjacentMines(index);
    if (mineCount > 0) {
      cell.textContent = mineCount;
    } else {
      const neighbors = getNeighbors(index);
      neighbors.forEach((neighborIndex) => revealCell(neighborIndex));
    }
  }
}

function countAdjacentMines(index) {
  const neighbors = getNeighbors(index);
  return neighbors.filter((neighborIndex) => mines.includes(neighborIndex))
    .length;
}

function getNeighbors(index) {
  const neighbors = [];
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const neighborRow = row + i;
      const neighborCol = col + j;
      if (
        neighborRow >= 0 &&
        neighborRow < boardSize &&
        neighborCol >= 0 &&
        neighborCol < boardSize
      ) {
        neighbors.push(neighborRow * boardSize + neighborCol);
      }
    }
  }

  return neighbors;
}

function updatePoints() {
  const pointsDisplay = document.getElementById("points");
  pointsDisplay.textContent = `Points: ${points}`;
}

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("revealed", "mine");
    cell.textContent = "";
  });
  revealedCells = 0;
  points = 0;
  updatePoints();
  generateMines();
}

initializeBoard();

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);
