class Digger {
    level
    holesCount;
    board;
    board_transpose;
    boardSize;
    LevelSelector;
    levels = [
        [
            [4, 6],
            [8, 9],
            [10, 11]
        ],
        [
            [32, 45],
            [46, 49],
            [54, 59]
        ]
    ];
    rowColumn_MinCount = [
        [
            [2],
            [1],
            [1]
        ],
        [
            [4, 8],
            [3, 6],
            [1, 4]
        ]
    ];

    constructor(_level, _board, _boardSize) {
        this.level = _level
        this.board = _board;
        this.boardSize = _boardSize;
        this.LevelSelector = _boardSize == 9 ? 1 : 0;
        this.holesCount = this.random(this.levels[this.LevelSelector][_level][1], this.levels[this.LevelSelector][_level][0])        
        this.digChooser(this.holesCount)
    }

    digChooser(howMany){
        let partition1 = random(howMany - 1) + 1;
        partition1 += ( parseInt(partition1%2) )
        let partition2 = howMany - partition1;        
        this.symmetricalDig(partition1)
        this.randomDig(partition2)
    }

    random(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomDig(howMany){
        let copyOfBoard = copyBoard(this.board)
        let copyOfHowMany = howMany;

        while (howMany > 0) {
            let availabaleArray = this.availableCells();            
            //if no cells available for digging, copy board and holesCount and start again
            if(availabaleArray.length < 1){                
                howMany = copyOfHowMany
                this.board = copyOfBoard
                copyOfBoard = copyBoard(this.board)                                
            }else{
                let randomCell = availabaleArray[this.random(availabaleArray.length - 1)]            
                this.board[randomCell[0]][randomCell[1]] = 0;
                howMany--;
            }            
        }        
    }

    

    symmetricalDig(howMany) {
        let copyOfBoard = copyBoard(this.board)
        let copyOfHowMany = howMany;

        while(howMany > 0){
            let availabaleArray = this.availableCells();
            
            //if no items avaialble for diggin, start over
            if(availabaleArray.length < 1){
                howMany = copyOfHowMany
                this.board = copyBoard(copyOfBoard)
                copyOfBoard = copyBoard(this.board)
            }else{
                let randomCell = availabaleArray[random( parseInt(availabaleArray.length/2 - 1) )]            
                let row = randomCell[0]
                let col = randomCell[1]
                let row_t = (this.boardSize - 1) - row
                let col_t = (this.boardSize - 1) - col
        
                this.board[row][col] = 0;
                this.board[row_t][col_t] = 0;
        
                howMany -= 2;
            }

        }
    }

    availableCells(){
        let availableRows = [];
        let availableColumns = [];
        let availCells = []
        let min = this.rowColumn_MinCount[this.LevelSelector][this.level][0];    

        //availabale rows
        this.board.forEach((x, idx) => {
          let rowValuesSum =  x.filter(y => y > 0)
          if(rowValuesSum.length > min ) availableRows.push(idx)
        })

        for(let col = 0; col < this.boardSize; col++){
            let colValuesSum = 0
            for(let row=0; row< this.boardSize; row++){
                colValuesSum += (this.board[row][col] > 0)
            }
            if(colValuesSum > min) availableColumns.push(col)
        }

        // console.log(this.board);
        // console.log('availableRows: ', availableRows);
        // console.log('availableColumns: ', availableColumns);

        for(let row = 0 ;row < availableRows.length; row++){
            for(let col =0; col < availableColumns.length; col ++){
                let x = availableRows[row];
                let y = availableColumns[col]

                if(this.board[x][y] > 0){
                    availCells.push([x,y]);
                }
            }
        }

        return availCells
    }


    //this function is no more in use and is replaced by the above function
    randomDig1(howMany) {
        let availableRows = Array.from({length: this.boardSize}, (val, idx) => idx)
        let availableColumns = Array.from({length: this.boardSize}, (val, idx) => idx)        
        let min = this.rowColumn_MinCount[this.LevelSelector][this.level][0];        

        while (howMany > 0) {
            this.availableCells()
            let row = availableRows[this.random(availableRows.length - 1)]
            let col = availableColumns[this.random(availableColumns.length - 1)]

            //row min checker
            let rowMinCount = this.board[row].filter(x => x > 0);
            //col min checker
            let colMinCount = 0;
            for (let i = 0; i < this.boardSize; i++) colMinCount += (this.board[i][col] > 0);
        
            while (rowMinCount.length == min || colMinCount == min) {
                if(rowMinCount.length == min) availableRows.splice(row, 1)
                if(colMinCount == min) availableColumns.splice(col, 1)
                if(availableColumns.length <1 || availableRows.length < 1 ){
                    console.log('available columns or available rows exhausted');
                    break;
                }
                row = availableRows[this.random(availableRows.length - 1)]
                col = availableColumns[this.random(availableColumns.length - 1)]

                rowMinCount = this.board[row].filter(x => x > 0);
                colMinCount = 0;
                for (let i = 0; i < this.boardSize; i++) colMinCount += (this.board[i][col] > 0)
            }
            //col min 

            if (this.board[row][col] != 0) {
                this.board[row][col] = 0;
                howMany--;
            }

        }
    }

}