let setLimits;
let boardSize = 4;
let level = 2; // 0 = Easy, 1 = Hard, 2 = Evil
let board, boxSize, isBoardValidate, solvedBoard, digger, questionBoard;
let view, dotMenuButton,solverMenu,dotMenuDiv;
let solver, solverStartButton,speedRangeButton, solverStopButton ,solverWatchButton;


//get set limits. for eg. for grid size: 4, set limits are [[0,1],[2,3]]
function getSetLimits(size) {
    setLimits = []
    let boxSize = parseInt(Math.sqrt(size))
    let arr = []
    for (let i = 0; i < size; i++) {
        arr.push(i)
        if ((i + 1) % boxSize == 0 && i != 0) {
            setLimits.push(arr);
            arr = []
        }
    }
    return setLimits;
}



function random(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


// we have row, columns and boxes in a sudoku
//accessing rows is pretty simple. 
//the below function returns a 2D array with
//box values inside a single row
function generateBoxArray(board, boardSize) {
    // generate a table, but each row contains values of a box
    let boxSize = parseInt(Math.sqrt(boardSize))
    let boxes = Array.from(Array(boardSize), () => new Array());
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let row = parseInt(i / boxSize)
            let col = parseInt(j / boxSize)
            let box = col + row * boxSize;
            boxes[box].push(board[i][j])
        }
    }
    return boxes
}

function getBoxNumber(row, col, boxSize) {
    let x = parseInt(row / boxSize)
    let y = parseInt(col / boxSize)
    return (y + x * boxSize);
}

//returns the column array of a board
function generateColumnArray(board) {
    let boardSize = board.length;
    let colArray = Array.from(Array(boardSize), () => new Array());

    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize; row++) {
            colArray[col][row] = board[row][col]
        }
    }

    return colArray;
}

function removeInArrayValue(arr, val){
    let idx = arr.indexOf(val);
    if(idx >= 0){
        arr.splice(idx,1)
        return true;
    } else{
        return false;
    }
}

//return the tranposed values of the board, and 'which' has 2 values: position or values
function transposeBoard(board, boardSize, which) {
    let board_inv = Array.from(Array(boardSize), () => new Array(boardSize).fill(0));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (which == 'values') {
                board_inv[j][i] = board[i][j]
            } else if (which == 'positions') {
                board_inv[j][i] = [i, j]
            }
        }
    }

    return board_inv
}


//return copy of a given board
//?because somehow, iam not able to acheive the same in script.js
//?everytime i try to copy, its making a reference copy and not value copy
function copyBoard(board) {
    let copyOfBoard = Array.from(Array(board.length), () => new Array(board.length).fill(0))
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            copyOfBoard[i][j] = board[i][j]
        }
    }
    return copyOfBoard;
}


//########################## sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');

    // Sleep in loop
    for (let i = 0; i < 5; i++) {
        if (i === 3)
            await sleep(2000);
        console.log(i);
    }
}