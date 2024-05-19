let ballPosition = 0;

function shuffle() {
    const message = document.getElementById('message');
    message.textContent = '';
    
    // Randomly place the ball under one of the bowls
    ballPosition = Math.floor(Math.random() * 3) + 1;
    console.log("Ball is under bowl:", ballPosition);
}

function checkBowl(bowlNumber) {
    const message = document.getElementById('message');
    if (bowlNumber === ballPosition) {
        message.textContent = 'You found the ball! :)';
    } else {
        message.textContent = 'Try again! :(';
    }
}

// Initial shuffle to start the game
shuffle();
