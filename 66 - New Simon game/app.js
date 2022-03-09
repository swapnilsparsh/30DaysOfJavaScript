let order = []; // keeps track of order of light
let playerOrder = [];//plyer order pressing light
let flash;
let turn; // keep track of turn
let good; // whter move is valid or not
let compTurn // Computer turn
let intervalId
let strict = false // strict mode ,intially off
let noise = true;
let on = false // power button
let win; // decide winner

const turnCounter = document.querySelector("#turn"); // display score and dceision
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");// power button
const StrictButton = document.querySelector("#strict"); // strict button
const starButton = document.querySelector("#start"); // start button

StrictButton.addEventListener('click', e => {
    if (StrictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
})
onButton.addEventListener('click',e=>{
    if(onButton.checked==true){
        on=true;
        turnCounter.innerHTML="-";
        //score display on
    }
    else{
        on = false;
        turnCounter.innerHTML=""; // score disply reste       
        clearColor();
        clearInterval(intervalId);
    }
})

starButton.addEventListener('click',e =>{
    if(on || win){
        play();
    }
});

function play(){
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn =1;
    turnCounter.innerHTML =1;
    good = true;
    for(var i =0;i<20;i++){ // twenty levels 
        order.push(Math.floor(Math.random()*4)+1)
    }
    compTurn = true; // computer start flashing light

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn(){
    on = false; // plyer not abel to click color pads because 
    // that time computer are flashing the light

    if(flash == turn){ // if flashing of ligth is equal to no of click
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;

    }
    if(compTurn){
        clearColor();
        setTimeout(()=>{
            if(order[flash]==1) one();
            if(order[flash]==2) two();
            if(order[flash]==3) three();
            if(order[flash]==4) four();
            flash++;
        },200)
    }

}
function one(){
    if(noise){
        let audio = document.getElementById("clip1")
        audio.play();
    }
    noise = true
    topLeft.style.backgroundColor = 'lightgreen';
}
function two(){
    if(noise){
        let audio = document.getElementById("clip2")
        audio.play();
    }
    noise = true
    topRight.style.backgroundColor = 'red';
}
function three(){
    if(noise){
        let audio = document.getElementById("clip3")
        audio.play();
    }
    noise = true
    bottomLeft.style.backgroundColor = 'yellow';
}
function four(){
    if(noise){
        let audio = document.getElementById("clip4")
        audio.play();
    }
    noise = true
    bottomRight.style.backgroundColor = 'blue';
}

function clearColor(){
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomLeft.style.backgroundColor = 'goldenrod';
    bottomRight.style.backgroundColor = 'darkblue';
}

function flashcolor(){
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'red';
    bottomLeft.style.backgroundColor = 'yellow';
    bottomRight.style.backgroundColor = 'blue';
}

topLeft.addEventListener('click',e =>{
    if(on){
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
})
topRight.addEventListener('click',e =>{
    if(on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
})
bottomLeft.addEventListener('click',e =>{
    if(on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
})
bottomRight.addEventListener('click',e =>{
    if(on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
})

function check(){
    if (playerOrder[playerOrder.length-1]!== order[playerOrder.length-1]) good = false;
    if(playerOrder.length==10 && good){
        winGame();
    }
    if(!good){
        flashcolor()
        turnCounter.innerHTML = "NO!"
        setTimeout(()=>{
           turnCounter.innerHTML=turn 
           clearColor();
           if(strict){
               play();
           }
           else{
               compTurn =true
               flash=0;
               playerOrder=[]
               good =true;
               intervalId = setInterval(gameTurn,800);
           }
        },800);
        noise = false;
    }

    if(turn== playerOrder.length && good && !win){
        turn++;
        playerOrder=[];
        compTurn=true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame(){
    flashcolor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}