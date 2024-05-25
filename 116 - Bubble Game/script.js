//GameBoard
let gameBox = document.querySelector(".cbody")
let bubble = document.querySelector(".bubble")

//Sound Effects
let hitSound = new Audio("hit.wav")
let misSound = new Audio("wrong.wav")
let overSound = new Audio("over.mp3")

//DefaulScreen
let starting=`<div.ending><h2 class="start" style="font-size:35px;border:2px solid black;padding:0px 20px;border-radius:25px;background-color:lightgreen;cursor:pointer;">Start</h2></div>`
gameBox.innerHTML=starting
let startBtn=document.querySelector(".start")

//Creating Bubbles
const makebubble = () => {
    let clutter = "";
    for (let i = 0; i < 152; i++) {
        let val = Math.floor(Math.random() * 9)+1
        clutter += `<div class="bubble">${val}</div>`
    }
    gameBox.innerHTML = clutter

}

//Counting Score
let score = 0;
let scorevalue = document.querySelector("#scoreval")
scorevalue.textContent = 0
const increaseScore = () => {
    score += 10
    scorevalue.textContent = score

}

//Hit Value Changing Randomly
let htval;
let hitvalue = document.querySelector("#hitval")
hitvalue.textContent = 0
const changeHitval = () => {

    htval = Math.floor(Math.random() * 9)+1
    hitvalue.textContent = htval
}

//Timer
let timer = 10
document.querySelector("#timeval").textContent = timer
let endGame=document.querySelector(".ending")
const runTime = () => {
    const timerr = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timeval").textContent = timer
        }
        else {
            clearInterval(timerr)
            overSound.play()
            gameBox.innerHTML = `<div class="ending"><h1 style="font-size:70px">game Over</h1><h2>Score : ${score}</h2><a href="index.html" style="display:flex;gap:5px;align-item:center;text-decoration:none;color:black;font-size:30px;margin-top:15px">restart<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></a></div>`

        }
    }, 1000);
}

//Starting Game
startBtn.addEventListener("click",()=>{
    makebubble()
    runTime()
    changeHitval()
})

//Hitting Bubble 
gameBox.addEventListener("click", (dets) => {
    let htnbtn = Number(dets.target.textContent);
    console.log(dets.target)
    if (htnbtn === htval) {
        hitSound.play()
        increaseScore()
        makebubble()
        changeHitval()

    }
    else if(dets.target!=gameBox && htnbtn != htval){
        misSound.play()

    }
    

})
