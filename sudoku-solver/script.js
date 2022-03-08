window.addEventListener('load', () => {
    //program enters from this door
    initActions()    
})

function newGame(_boardSize, _level) {    
    
    boardSize = _boardSize;
    boxSize = parseInt(Math.sqrt(boardSize))
    level = _level; 


    board = new Board(boardSize);
    isBoardValidate = board.createBoard(boardSize);
    console.log('isBoardValidate', isBoardValidate)

    //dig holes
    solvedBoard = copyBoard(board.board)
    digger = new Digger(level, board.board, boardSize)
    questionBoard = copyBoard(board.board)

    //draw grid on DOM
    view = new View()
    view.createBoardHTML(boardSize)
    view.printBoard(questionBoard)

    initActions()

    //solver
    //solver = new Solver(board.board)
}

function clearUserInput(){
    board.board = copyBoard(questionBoard)
    view.printBoard(questionBoard)
}