`use strict`;
let secretNumber = Math.trunc(Math.random()*20) + 1;
let highScore = 0;
let score = 20;

const displayMessage = function (message) {
    document.querySelector(`.message`).textContent = message;
}


// Refactoring the code
document.querySelector(`.check`).addEventListener(`click`,function() {
    const guess = Number(document.querySelector(`.guess`).value);
    if(!guess) {
        // document.querySelector(`message`).textContent('No Number!');
        displayMessage(`No Number!`);
    }
    else if(guess === secretNumber) {
        // highScore = Math.max(score, highScore);
        // document.querySelector(`highscore`).textContent = highScore;
        if(score > highScore) {
            highScore = score;
            document.querySelector(`.highscore`).textContent = highScore;
        }
        document.querySelector(`.number`).textContent = secretNumber;
        document.querySelector(`body`).style.backgroundColor = `#60b347`;
        document.querySelector(`.number`).style.width = `30rem`;
        displayMessage(`Correct Number!`);
        // document.querySelector(`.message`).textContent = `Correct Number!`;
    }
    else {
        if(score > 1) {
            score--;
            displayMessage(guess < secretNumber ? `Too Low!` : `Too High!`);
            // document.querySelector(`.message`).textContent = guess < secretNumber ? `Too Low!` : `Too High!`;
            document.querySelector(`.score`).textContent = score;
        }
        else {
            displayMessage(`You lost the game!`);
            // document.querySelector(`.message`).textContent = `You lost the game!`;
            document.querySelector(`.score`).textContent = 0;
        }
    }
    // else if(guess < secretNumber)  {
    //     if(score > 1) {
    //         score--;
    //         document.querySelector(`.message`).textContent = `Too Low!`;
    //         document.querySelector(`.score`).textContent = score;
    //     }
    //     else {
    //         document.querySelector(`.message`).textContent = `You lost the game!`;
    //         document.querySelector(`.score`).textContent = 0;
    //     }
    // }
    // else {
    //     if(score > 1) {
    //         score--;
    //         document.querySelector(`.message`).textContent = `Too High!`;
    //         document.querySelector(`.score`).textContent = score;
    //     }
    //     else {
    //         document.querySelector(`.message`).textContent = `You lost the game!`;
    //         document.querySelector(`.score`).textContent = 0;
    //     }
    // }
});



document.querySelector(`.again`).addEventListener(`click`,function() {
    score = 20;
    secretNumber = Math.trunc(Math.random()*20) + 1;
    displayMessage(`Start guessing...`);
    // document.querySelector(`.message`).textContent = `Start guessing...`;
    document.querySelector(`.score`).textContent = score;
    document.querySelector(`.number`).textContent = `?`;
    document.querySelector(`.guess`).value = ``;
    document.querySelector(`body`).style.backgroundColor = `#222`;
    document.querySelector(`.number`).style.width = `15rem`;
})