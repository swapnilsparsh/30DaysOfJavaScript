class View{

    createBoardHTML(size){
        this.changeGridCSS(size)  

        //board
        let boardElement = document.querySelector('#board')
        let html = '';
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let id = String(i) + String(j);
                
                let setSize = parseInt(Math.sqrt(size));
                let set__row = (i+1)%(setSize) == 0  ? "set__row" : "";
                let set__col = (j+1)%(setSize) == 0  ? "set__col" : "";                             

                let item = `<div id='${id}' data-row='${i}' class="grid__item flex-col ${set__row} ${set__col}">${j+1}</div>`
                html += item;
            }
        }

        boardElement.innerHTML = html;

        //keypad
        let keypad = document.querySelector('#keypad')
        html = ''
        for(let i=0;i<size;i++){
            html += `<span class="flex-col keypad__item">${i+1}</span>`
        }
        html+=`<span class="flex-col keypad__item"><img src="images/trash-o.svg" alt=""></span>`;        
        keypad.innerHTML = html;        
    }

    printBoard(board){
        
        let size = board.length;
        for(let i=0;i<size;i++){
            for(let j=0; j<size;j++){
                let element = document.getElementById(`${i}${j}`);
                
                element.textContent = board[i][j] > 0 ? board[i][j] : " ";
                let given = board[i][j] > 0 ? "given " : "emptyItem ";
                
                element.classList.add(given.replace(" ",''))
                
            }
        }
    }

    changeGridCSS(size){
        let temp = "auto ".repeat(size)
        let boardElement = document.querySelector('#board')
        boardElement.style.gridTemplateColumns = temp
        boardElement.style.gridTemplateRows = temp
        boardElement.style.fontSize = size == 4 ? "2.25rem" : "1rem";
    }
}