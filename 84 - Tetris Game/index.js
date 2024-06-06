const grid = document.querySelector(".grid")
let squares = Array.from(document.querySelectorAll('.grid div'));
const score = document.getElementById("score");
const startbtn = document.getElementById('start-btn')
const btnimg = document.getElementById('btnimg');
let count = 0;
const width = 10;

//defining arrow buttons to use in phones

const leftbtn = document.getElementById('left');
const rightbtn = document.getElementById('right');
const downbtn = document.getElementById('down');
const rotatebtn = document.getElementById('rotate');

//colour
const color = ["red", "blue", "green", "purple", "yellow"]


//shapes

const lshape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zshape = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
]

const tshape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]

const oshape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const ishape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
]
const theShapes = [lshape, zshape, oshape, tshape, ishape]
let currentposition = 4;
let currentrotation = 0;

//randomly selecting shapes

let random = Math.floor(Math.random() * theShapes.length)
let currentshape = theShapes[random][currentrotation]

//drawing the shapes

function draw() {
    currentshape.forEach((index) => {
        squares[currentposition + index].style.background = color[random];
    })
}
draw()

//erasing the shapes

function erase() {
    currentshape.forEach((index) => {
        squares[currentposition + index].style.background = ""
    })
}
function movedown() {
    erase()
    currentposition += width;
    draw()
    stop()
}
var timer = setInterval(movedown, 1000)

//stopping the shapes

function stop() {
    if (currentshape.some(index => squares[currentposition + index + width].classList.contains('freeze'))) {
        currentshape.forEach(index => squares[currentposition + index].classList.add('freeze'))

        //start a new shape to fall

        random = Math.floor(Math.random() * theShapes.length)
        currentrotation = 0
        currentshape = theShapes[random][currentrotation]
        currentposition = 4;
        draw()
        gameOver()
        addScore()
    }
}
//function to control the game

function control(e) {
    if (e.keyCode === 37) {
        moveleft()
    }
    else if (e.keyCode === 39) {
        moveright()
    }
    else if (e.keyCode === 40) {
        movedown()
    }
    else if (e.keyCode === 32) {
        rotate()
    }
}

window.addEventListener("keydown", control)

//controlling shapes

leftbtn.addEventListener('click', moveleft);
rightbtn.addEventListener('click', moveright);
downbtn.addEventListener('click', movedown);
rotatebtn.addEventListener('click', rotate);

//function to move left

function moveleft() {
    erase()
    let leftblockage = currentshape.some(index => (currentposition + index) % width === 0)
    let blockage = currentshape.some(index => squares[currentposition + index - 1].classList.contains('freeze'));

    if (!leftblockage && !blockage) {
        currentposition--;
    }
    // currentposition--;
    draw()
}
function moveright() {
    erase()
    let rightblockage = currentshape.some(index => (currentposition + index) % width === (width - 1))
    let blockage = currentshape.some(index => squares[currentposition + index + 1].classList.contains('freeze'));

    if (!rightblockage && !blockage) {
        currentposition++;
    }
    // currentposition--;
    draw()
}

//to rotate a figure

function rotate() {
    erase()
    currentrotation++;
    if (currentrotation === 4) {
        currentrotation = 0;
    }
    currentshape = theShapes[random][currentrotation]
    draw()
}
//pause button

function pause() {
    if (timer) {
        clearInterval(timer)
        timer = null;
        btnimg.src = "assets/play.jpg";

    }
    else {
        draw()
        timer = setInterval(movedown, 1000);
        btnimg.src = "assets/pause.png"
    }
}

startbtn.addEventListener("click", pause)

//for game over

function gameOver() {
    if (currentshape.some(index => squares[currentposition + index].classList.contains('freeze'))) {
        score.innerHTML = "Game Over";
        clearInterval(timer);
        pause();
        window.removeEventListener("keydown", control);
        leftbtn.style.pointerEvents = "none";
        rightbtn.style.pointerEvents = "none";
        downbtn.style.pointerEvents = "none";
        rotatebtn.style.pointerEvents = "none";
        startbtn.style.pointerEvents = "none";
    }
}

// to add Score
function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        console.log(row)

        if (row.every(index => squares[index].classList.contains("freeze"))) {
            count += 10
            score.textContent = `score:${count}`
            row.forEach(index => {
                squares[index].classList.remove("freeze");
                squares[index].style.background = '';
            })
            const squareRemoved = squares.splice(i, width)
            console.log(squareRemoved)
            squares = squareRemoved.concat(squares)
            squares.forEach(square => grid.appendChild(square))
        }
    }
}