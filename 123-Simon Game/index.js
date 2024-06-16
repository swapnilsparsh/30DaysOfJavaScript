let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector('#turn')
const topLeft = document.querySelector('#topleft')
const topRight = document.querySelector('#topright')
const bottomLeft = document.querySelector('#bottomleft')
const bottomRight = document.querySelector('#bottomright')
const onButton = document.querySelector('#on')
const strictButton = document.querySelector('#strict')
const startButton = document.querySelector('#start')

onButton.addEventListener('click',function(){
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-"
    }
    else{
        on = false;
        turnCounter.innerHTML = ''
        clearColor();// all the lights should go of 
        clearInterval(intervalId);
    }
})

strictButton.addEventListener('click',function(){
    if(strictButton.checked == true){
        strict = true;
    }
    else{
        strict = false;
    }
})

startButton.addEventListener('click',function(){
    if(on || win){
        play();
    }
})

function play(){
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for(let i = 0 ; i < 20 ; i++){
        order.push(Math.floor((Math.random()*4)+1))
    }
    console.log(order)
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);

}

function gameTurn(){
    on = false; // dont want the ply to click any button 
    if(flash == turn ){
        clearInterval(intervalId)
        compTurn = false;
        clearColor();
        on = true;
    }
    if(compTurn){
        clearColor();
        setTimeout(()=>{
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++

        },200)
    }
}
function one(){
    if(noise){
        let audio = document.querySelector('#clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = '#cfe9f9'; 
}
function two(){
    if(noise){
        let audio = document.querySelector('#clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = '#f9e8cf'; 
}
function three(){
    if(noise){
        let audio = document.querySelector('#clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = '#f9dcd3'; 
}
function four(){
    if(noise){
        let audio = document.querySelector('#clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = '#e5d3f9'; 
}


function clearColor() {
    topLeft.style.backgroundColor = '#8fd3f4';
    topRight.style.backgroundColor = '#f4d38f';
    bottomLeft.style.backgroundColor = '#f4a88f';
    bottomRight.style.backgroundColor = '#d18ff4';
}

topLeft.addEventListener('click',function(){
    if(on){
        playerOrder.push(1);
        one();
        check();
        if(!win){
            setTimeout(()=> clearColor(),300)
        }
    }
})

topRight.addEventListener('click',function(){
    if(on){
        playerOrder.push(2);
        two();
        check();
        if(!win){
            setTimeout(()=> clearColor(),300)
        }
    }
})
bottomLeft.addEventListener('click',function(){
    if(on){
        playerOrder.push(3);
        three();
        check();
        if(!win){
            setTimeout(()=> clearColor(),300)
        }
    }
})
bottomRight.addEventListener('click',function(){
    if(on){
        playerOrder.push(4);
        four();
        check();
        if(!win){
            setTimeout(()=> clearColor(),300)
        }
    }
})

function check(){
    if(playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]){
        good = false;
    }

    if(playerOrder.length == 20 && good){
        winGame();
    }

    if(good == false){
        flashColor();
        turnCounter.innerHTML = '!NO';
        setTimeout(()=>{
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict){
                play();
            }
            else{
                // reapeat the rounf 
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn,800)
            }
        },800)
        noise = false;

        
    }
    if(turn == playerOrder.length && good && !win){
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn,800)

    }
}
function flashColor(){
    topLeft.style.backgroundColor = '#cfe9f9'; 
    topRight.style.backgroundColor = '#f9e8cf'; 
    bottomLeft.style.backgroundColor = '#f9dcd3'; 
    bottomRight.style.backgroundColor = '#e5d3f9'; 


    


}

function winGame(){
    flashColor();
    turnCounter.innerHTML = "WIN"
    on = false;
    win = true;
}