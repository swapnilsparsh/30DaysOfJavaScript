const board = document.getElementById('board');
const turnDisplay = document.getElementById('turn');
let currentPlayer = 'red';
let selectedCell = null;

function createBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
      board.appendChild(cell);

      if ((row + col) % 2 !== 0) {
        if (row < 3) addPiece(cell, 'black');
        if (row > 4) addPiece(cell, 'red');
      }

      cell.addEventListener('click', () => handleClick(cell));
    }
  }
}

function addPiece(cell, color) {
  const piece = document.createElement('div');
  piece.classList.add('piece', color);
  cell.appendChild(piece);
}

function handleClick(cell) {
  const piece = cell.querySelector('.piece');

  if (selectedCell) {
    if (isValidMove(selectedCell, cell)) {
      movePiece(selectedCell, cell);
      promoteIfNeeded(cell);
      if (!checkMultiCapture(cell)) {
        switchTurn();
      }
    }
    selectedCell.classList.remove('selected');
    selectedCell = null;
  } else if (piece && piece.classList.contains(currentPlayer)) {
    selectedCell = cell;
    cell.classList.add('selected');
  }
}

function isValidMove(fromCell, toCell) {
  const fromRow = +fromCell.dataset.row;
  const fromCol = +fromCell.dataset.col;
  const toRow = +toCell.dataset.row;
  const toCol = +toCell.dataset.col;
  const piece = fromCell.querySelector('.piece');
  const isKing = piece.classList.contains('king');
  const direction = currentPlayer === 'red' ? -1 : 1;
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);
  const targetEmpty = !toCell.querySelector('.piece');

  if (!targetEmpty) return false;

  // Simple move
  if (Math.abs(rowDiff) === 1 && colDiff === 1) {
    if (isKing || rowDiff === direction) {
      return !hasMandatoryCapture(currentPlayer);
    }
  }

  // Capture move
  if (Math.abs(rowDiff) === 2 && colDiff === 2) {
    const midRow = (fromRow + toRow) / 2;
    const midCol = (fromCol + toCol) / 2;
    const midCell = document.querySelector(`[data-row="${midRow}"][data-col="${midCol}"]`);
    const midPiece = midCell.querySelector('.piece');
    if (midPiece && !midPiece.classList.contains(currentPlayer)) {
      midCell.innerHTML = '';
      return true;
    }
  }

  return false;
}

function movePiece(fromCell, toCell) {
  const piece = fromCell.querySelector('.piece');
  toCell.appendChild(piece);
  fromCell.innerHTML = '';
}

function switchTurn() {
  currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
  turnDisplay.textContent = `Turn: ${capitalize(currentPlayer)}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function promoteIfNeeded(cell) {
  const row = +cell.dataset.row;
  const piece = cell.querySelector('.piece');
  if (!piece.classList.contains('king')) {
    if ((piece.classList.contains('red') && row === 0) ||
        (piece.classList.contains('black') && row === 7)) {
      piece.classList.add('king');
    }
  }
}

function hasMandatoryCapture(player) {
  const cells = document.querySelectorAll('.cell');
  for (let cell of cells) {
    const piece = cell.querySelector('.piece');
    if (piece && piece.classList.contains(player)) {
      const row = +cell.dataset.row;
      const col = +cell.dataset.col;
      const directions = piece.classList.contains('king') ? [1, -1] : [player === 'red' ? -1 : 1];
      for (let dr of directions) {
        for (let dc of [-1, 1]) {
          const midRow = row + dr;
          const midCol = col + dc;
          const endRow = row + dr * 2;
          const endCol = col + dc * 2;
          const midCell = document.querySelector(`[data-row="${midRow}"][data-col="${midCol}"]`);
          const endCell = document.querySelector(`[data-row="${endRow}"][data-col="${endCol}"]`);
          if (midCell && endCell && !endCell.querySelector('.piece')) {
            const midPiece = midCell.querySelector('.piece');
            if (midPiece && !midPiece.classList.contains(player)) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function checkMultiCapture(cell) {
  const piece = cell.querySelector('.piece');
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;
  const directions = piece.classList.contains('king') ? [1, -1] : [currentPlayer === 'red' ? -1 : 1];

  for (let dr of directions) {
    for (let dc of [-1, 1]) {
      const midRow = row + dr;
      const midCol = col + dc;
      const endRow = row + dr * 2;
      const endCol = col + dc * 2;
      const midCell = document.querySelector(`[data-row="${midRow}"][data-col="${midCol}"]`);
      const endCell = document.querySelector(`[data-row="${endRow}"][data-col="${endCol}"]`);
      if (midCell && endCell && !endCell.querySelector('.piece')) {
        const midPiece = midCell.querySelector('.piece');
        if (midPiece && !midPiece.classList.contains(currentPlayer)) {
          selectedCell = cell;
          cell.classList.add('selected');
          return true;
        }
      }
    }
  }
  return false;
}

function checkWinCondition() {
  const redPieces = document.querySelectorAll('.piece.red');
  const blackPieces = document.querySelectorAll('.piece.black');

  if (redPieces.length === 0) {
    alert('Black wins!');
    createBoard();
  } else if (blackPieces.length === 0) {
    alert('Red wins!');
    createBoard();
  }
}

function showRules() {
  document.getElementById('rules-modal').style.display = 'block';
}

function hideRules() {
  document.getElementById('rules-modal').style.display = 'none';
}

// Hook into movePiece to check win condition
const originalMovePiece = movePiece;
movePiece = function(fromCell, toCell) {
  originalMovePiece(fromCell, toCell);
  checkWinCondition();
};

createBoard();