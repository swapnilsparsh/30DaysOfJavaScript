const whiteScore = document.getElementById("whiteScore");
const blackScore = document.getElementById("blackScore");
const othelloBoard = document.getElementById("othelloBoard");
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);
let squares = document.getElementsByClassName("square");
let squaresToFlip = [];
let isWhiteTurn = true;
let whiteCount = 2;
let blackCount = 2;
let noLegalMove = false;

setupBoard();

function setupBoard() {
    for (let i = 0; i < squares.length; i++) {
        let row = 8 - Math.floor(i / 8);
        let col = (i % 8) + 1;
        let id = row * 10 + col;
        squares[i].setAttribute("id", id);
        squares[i].addEventListener("click", onSquareClick);
    }

    placeInitialPieces();

    let legalSquares = getLegalSquares("white");
    highlightLegalSquares(legalSquares);
    whiteScore.classList.add("active");
}

function placeInitialPieces() {
    const initialPieces = [
        { id: "44", color: "white" },
        { id: "55", color: "white" },
        { id: "45", color: "black" },
        { id: "54", color: "black" }
    ];

    initialPieces.forEach(piece => {
        let square = document.getElementById(piece.id);
        let pieceElement = createPiece(piece.color);
        square.appendChild(pieceElement);
    });
}

function createPiece(color) {
    let piece = document.createElement("div");
    piece.setAttribute("class", "piece " + color);
    piece.setAttribute("color", color);
    return piece;
}


function getLegalSquares(pieceColor) {
    let legalSquares = [];
    for (let i = 0; i < squares.length; i++) {
        let row = 8 - Math.floor(i / 8);
        let col = (i % 8) + 1;
        let id = (row * 10 + col).toString();
        let square = document.getElementById(id);
        if (isSquareOccupied(square) != "blank") continue;

        let directions = [
            moveToEighthRow,
            moveToFirstRow,
            moveToEighthColumn,
            moveToFirstColumn,
            moveToEighthRowEighthColumn,
            moveToEighthRowFirstColumn,
            moveToFirstRowEighthColumn,
            moveToFirstRowFirstColumn
        ];

        for (let direction of directions) {
            let stopSquareContent = direction(id, pieceColor);
            if (stopSquareContent != "blank" && squaresToFlip.length > 0) {
                legalSquares.push(id);
                break;
            }
            squaresToFlip.length = 0;
        }
    }
    return legalSquares;
}

function isSquareOccupied(square) {
    if (square.querySelector(".piece")) {
        return square.querySelector(".piece").getAttribute("color");
    } else {
        return "blank";
    }
}

function moveToDirection(startingSquareId, pieceColor, rowChange, colChange) {
    const row = parseInt(startingSquareId.charAt(0));
    const column = parseInt(startingSquareId.charAt(1));
    let currentRow = row + rowChange;
    let currentCol = column + colChange;
    let squaresToFlipTemp = [];

    while (currentRow >= 1 && currentRow <= 8 && currentCol >= 1 && currentCol <= 8) {
        let currentSquareId = currentRow + "" + currentCol;
        let currentSquare = document.getElementById(currentSquareId);
        let squareContent = isSquareOccupied(currentSquare);
        if (squareContent == pieceColor) {
            squaresToFlip.push(...squaresToFlipTemp);
            return squareContent;
        }
        if (squareContent == "blank") return squareContent;
        squaresToFlipTemp.push(currentSquareId);
        currentRow += rowChange;
        currentCol += colChange;
    }
    return "blank";
}

function moveToEighthRow(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, 1, 0); 
    }
function moveToFirstRow(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, -1, 0); 
    }
function moveToEighthColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, 0, 1); 
    }
function moveToFirstColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, 0, -1); 
    }
function moveToEighthRowEighthColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, 1, 1); 
    }
function moveToEighthRowFirstColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, 1, -1); 
    }
function moveToFirstRowEighthColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, -1, 1); 
    }
function moveToFirstRowFirstColumn(startingSquareId, pieceColor) {
     return moveToDirection(startingSquareId, pieceColor, -1, -1); 
    }

function onSquareClick(e) {
    let clickedSquare = e.target;
    let pieceColor = isWhiteTurn ? "white" : "black";
    let availableSquares = getLegalSquares(pieceColor);

    if (!availableSquares.includes(clickedSquare.id)) return;

    let piece = createPiece(pieceColor);
    clickedSquare.appendChild(piece);
    pieceColor == "white" ? whiteCount++ : blackCount++;
    checkAndFlip(clickedSquare.id, pieceColor);
    switchTurn();
    checkEndGame();
}

function checkAndFlip(clickedSquareId, pieceColor) {
    let directions = [
        moveToEighthColumn,
        moveToEighthRow,
        moveToEighthRowEighthColumn,
        moveToEighthRowFirstColumn,
        moveToFirstColumn,
        moveToFirstRow,
        moveToFirstRowEighthColumn,
        moveToFirstRowFirstColumn
    ];
    directions.forEach(direction => direction(clickedSquareId, pieceColor));
    reversePieces(pieceColor);
    squaresToFlip.length = 0;
}

function reversePieces(color) {
    squaresToFlip.forEach((squareId) => {
        let square = document.getElementById(squareId);
        while (square.firstChild) {
            square.firstChild.remove();
        }
        let piece = createPiece(color);
        square.appendChild(piece);
        piece.classList.add("flip");
        color == "white" ? whiteCount++ && blackCount-- : whiteCount-- && blackCount++;
        whiteScore.innerHTML = "White Score: " + whiteCount;
        blackScore.innerHTML = "Black Score: " + blackCount;
    });
    squaresToFlip.length = 0;
}

function switchTurn() {
    isWhiteTurn = !isWhiteTurn;
    whiteScore.classList.toggle("active", isWhiteTurn);
    blackScore.classList.toggle("active", !isWhiteTurn);
    let pieceColor = isWhiteTurn ? "white" : "black";
    let availableSquares = getLegalSquares(pieceColor);
    highlightLegalSquares(availableSquares);
    if (availableSquares.length == 0) {
        isWhiteTurn = !isWhiteTurn;
        whiteScore.classList.toggle("active", isWhiteTurn);
        blackScore.classList.toggle("active", !isWhiteTurn);
        pieceColor = isWhiteTurn ? "white" : "black";
        availableSquares = getLegalSquares(pieceColor);
        highlightLegalSquares(availableSquares);
        if (availableSquares.length === 0) noLegalMove = true;
    } else {
        noLegalMove = false;
    }
}

function highlightLegalSquares(legalSquares) {
    clearLegalSquares();
    legalSquares.forEach((square) => {
        const squareElement = document.getElementById(square);
        squareElement.classList.add("legal-square");
    });
}

function clearLegalSquares() {
    const legalSquares = document.querySelectorAll(".legal-square");
    for (const square of legalSquares) {
        square.classList.remove("legal-square");
    }
}

function checkAndFlip(clickedSquareId, pieceColor) {
    let directions = [
        moveToEighthColumn,
        moveToEighthRow,
        moveToEighthRowEighthColumn,
        moveToEighthRowFirstColumn,
        moveToFirstColumn,
        moveToFirstRow,
        moveToFirstRowEighthColumn,
        moveToFirstRowFirstColumn
    ];
    directions.forEach(direction => direction(clickedSquareId, pieceColor));
    reversePieces(pieceColor);
    squaresToFlip.length = 0;
}

  
function reversePieces(color) {
    squaresToFlip.forEach(squareId => {
        let square = document.getElementById(squareId);
        while (square.firstChild) {
            square.removeChild(square.firstChild);
        }
        let piece = createPiece(color);
        square.appendChild(piece);
        piece.classList.add("flip");
        if (color === "white") {
            whiteCount++;
            blackCount--;
        } else {
            whiteCount--;
            blackCount++;
        }
    });
    whiteScore.innerHTML = "White Score: " + whiteCount;
    blackScore.innerHTML = "Black Score: " + blackCount;
}

function switchTurn() {
    isWhiteTurn = !isWhiteTurn;
    whiteScore.classList.toggle("active",isWhiteTurn);
    blackScore.classList.toggle("active",!isWhiteTurn);
    pieceColor = isWhiteTurn ? "white" : "black";
    availableSquares = getLegalSquares(pieceColor);
    highlightLegalSquares(availableSquares);
    if(availableSquares.length == 0) {
      isWhiteTurn = !isWhiteTurn;
      whiteScore.classList.toggle("active",isWhiteTurn);
      blackScore.classList.toggle("active",!isWhiteTurn);
      pieceColor = isWhiteTurn ? "white" : "black";
      availableSquares = getLegalSquares(pieceColor);
      highlightLegalSquares(availableSquares);
      if(availableSquares.length===0) noLegalMove = true;
    }
}

function checkEndGame() {
    let message = "";
    if(
      !(
        whiteCount+blackCount ==64 ||
        whiteCount ==0 ||
        blackCount ==0 ||
        noLegalMove
      )
    )
    return;
    if(whiteCount>blackCount)message = "White Wins!";
    if(whiteCount<blackCount)message = "Black Wins!";
    if(whiteCount==blackCount)message = "Draw!";
        showEndGameMessage(message);
}

function showEndGameMessage(message) {
    const alert = document.getElementById("alert");
    alert.style.display = "block";
    othelloBoard.style.opacity = 0.5;
    alert.innerHTML = message;
}

function restartGame() {

    whiteCount = 2;
    blackCount = 2;
    isWhiteTurn = true;
    noLegalMove = false;

    whiteScore.innerHTML = "White Score: " + whiteCount;
    blackScore.innerHTML = "Black Score: " + blackCount;

    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        while (square.firstChild) {
            square.removeChild(square.firstChild);
        }
    }

    placeInitialPieces();

    let pieceColor = isWhiteTurn ? "white" : "black";
    let legalSquares = getLegalSquares(pieceColor);
    highlightLegalSquares(legalSquares);

    const alert = document.getElementById("alert");
    alert.style.display = "none";

    othelloBoard.style.opacity = 1;
}
