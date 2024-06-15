var gameBoard = [
  0, 6, 6, 6, 6, 6, 6,
  0, 6, 6, 6, 6, 6, 6
];

var currentPlayer = 'one';
var readOut = document.querySelector('div.info');

function renderBoard() {
  var gameContainer = document.querySelector('.container');
  gameContainer.innerHTML = ''; // Clear previous content

  for (var i = 0; i < gameBoard.length; i++) {
    if (i % 7 === 0) {
      var row = document.createElement('div');
      gameContainer.appendChild(row);
    }

    var button = document.createElement('button');
    button.setAttribute('class', 'pit' + i);
    button.setAttribute('id', i);
    button.innerHTML = gameBoard[i];
    row.appendChild(button);
  }

  var playerClass = document.querySelectorAll('.container div');
  playerClass[0].setAttribute('class', 'playerTwo');
  playerClass[1].setAttribute('class', 'playerOne');

  setListeners();
}

function moveStones(pitIndex) {
  var stonesInHand = gameBoard[pitIndex];
  var pitNextIndex = pitIndex + 1;
  gameBoard[pitIndex] = 0;
  var lastIndex;
  if (stonesInHand > 0) {
    for (var i = pitNextIndex; i < stonesInHand + pitNextIndex; i++) {
      lastIndex = i % gameBoard.length;
      gameBoard[lastIndex] += 1;
    }
  }

  var nextTurn = bankStones(lastIndex);
  if (!nextTurn) {
    setPlayer();
  }
  updateBoard();
}

function bankStones(lastIndex) {
  var inverse = gameBoard.length - lastIndex;
  if ((lastIndex !== 0) && (lastIndex !== 7) && (gameBoard[lastIndex] === 1)) {
    if (currentPlayer === 'two') {
      if (1 <= lastIndex && lastIndex <= 6) {
        gameBoard[7] = gameBoard[7] + gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        gameBoard[inverse] = 0;
      }
    } else {
      if (8 <= lastIndex && lastIndex <= 13) {
        gameBoard[0] = gameBoard[0] + gameBoard[inverse] + 1;
        gameBoard[lastIndex] = 0;
        gameBoard[inverse] = 0;
      }
    }
  }

  // Check if the last stone landed in the player's bank
  if ((currentPlayer === 'one' && lastIndex === 0) || (currentPlayer === 'two' && lastIndex === 7)) {
    return true; // The player gets another turn
  }
  return false;
}

function updateBoard() {
  for (var i = 0; i < gameBoard.length; i++) {
    var pit = document.querySelectorAll('button');
    pit[i].textContent = gameBoard[i];
  }

  checkWin();
}

function checkWin() {
  var playerOneStones = gameBoard[1] + gameBoard[2] + gameBoard[3] + gameBoard[4] + gameBoard[5] + gameBoard[6];
  var playerTwoStones = gameBoard[8] + gameBoard[9] + gameBoard[10] + gameBoard[11] + gameBoard[12] + gameBoard[13];
  if (playerOneStones === 0 || playerTwoStones === 0) {
    var playerOneTotal = playerOneStones + gameBoard[0];
    var playerTwoTotal = playerTwoStones + gameBoard[7];

    if (playerOneTotal > playerTwoTotal) {
      readOut.textContent = 'Player One Wins!';
    } else {
      readOut.textContent = 'Player Two Wins!';
    }
  }
}

function setPlayer() {
  var gameContainer = document.querySelector('.container');
  
  if (currentPlayer === 'one') {
    currentPlayer = 'two';
    gameContainer.classList.add('rotated');
    readOut.textContent = 'It is player ' + currentPlayer + '\'s turn';
  } else {
    currentPlayer = 'one';
    gameContainer.classList.remove('rotated');
    readOut.textContent = 'It is player ' + currentPlayer + '\'s turn';
  }
}

function setListeners() {
  for (var i = 0; i < gameBoard.length; i++) {
    var pit = document.querySelectorAll('button');
    pit[i].addEventListener('click', function (eventObject) {
      moveStones(Number(eventObject.target.id));
    });
  }
}

renderBoard();
