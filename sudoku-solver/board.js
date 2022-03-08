class Board {
    board;
    boardSize;
    boxSize;
    boardValues;

    constructor(_boardSize) {
        this.boardSize = _boardSize;
        this.boxSize = parseInt(Math.sqrt(_boardSize))
        this.board = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(0));
        this.boardValues = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(0));
        
    }

    getBoard(){
        let newBoard = [...this.board]
        console.table(newBoard);
        return [...newBoard];
    }

    createBoard() {  
        //basic board is created here by shifting              
        this.board[0] = this.randomArray(this.boardSize)        
        for (let i = 2; i <= this.boardSize; i++) {
            //if the row is in a new set then shift by boxSize + 1
            let shiftSize = (i - 1) % this.boxSize == 0 ? this.boxSize + 1 : this.boxSize;
            this.board[i-1] = this.shiftSequence(this.board[i-2],shiftSize)            
        }

        //board is ran through combinations for removing obviousness                  
        return this.combinations() 
    }

    validate(){
        let validation = new Validate(this.board, this.boardSize);
        return validation.runTests()
    }

    random(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    randomArray(length, starting = 1) {
        //returns a array with random values 
        let sequence = Array.from({
            length: length
        }, (val, idx) => idx + starting)
        let temp;
        for (let i = 0; i < sequence.length; i++) {
            let randomNumber = this.random(length - 1)
            temp = sequence[i]
            sequence[i] = sequence[randomNumber]
            sequence[randomNumber] = temp
        }

        return sequence
    }

    shiftSequence(sequence, pos) {
        let newSeq = [...sequence]
        let part1 = newSeq.splice(0, pos)
        newSeq.push(...part1)
        return newSeq
    }

    combinations(){
        let combination = new Combinations(this.board, this.boardSize, this.boxSize)
        combination.runCombinations()
        return this.validate();
    }

}