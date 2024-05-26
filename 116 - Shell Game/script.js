let ballPosition = 0;
let gameOver = false;

function shuffle() {
    const message = document.getElementById('message');
    message.textContent = '';
    
    // Randomly place the ball under one of the bowls
    ballPosition = Math.floor(Math.random() * 3) + 1;
    console.log("Ball is under bowl:", ballPosition);
    gameOver = false;
    
    document.getElementById('bowl1').disabled = false;
    document.getElementById('bowl2').disabled = false;
    document.getElementById('bowl3').disabled = false;
}

function checkBowl(bowlNumber) {
    const message = document.getElementById('message');
    if (gameOver) {
        return;
    }

    if (bowlNumber === ballPosition) {
        message.textContent = 'You found the ball! :)';
        gameOver = true;
    } else {
        message.textContent = `Try again! :( The ball was under bowl ${ballPosition}. Please click the shuffle button to play again.`;
        gameOver = true;
        
        document.getElementById('bowl1').disabled = true;
        document.getElementById('bowl2').disabled = true;
        document.getElementById('bowl3').disabled = true;
    }
}

shuffle();