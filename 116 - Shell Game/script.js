let ballPosition = 0;
let gameOver = false;

function shuffle() {
    const message = document.getElementById('message');
    message.textContent = '';
    document.getElementById('playAgain').style.display = 'none';
    const ball = document.getElementById('ball');

  
    initialballPosition = Math.floor(Math.random() * 3) + 1;
    const initialBowl = document.getElementById(`bowl${initialballPosition}`);
    const initialBowlRect = initialBowl.getBoundingClientRect();
    ball.style.top = `${initialBowlRect.top - 40}px`;
    ball.style.left = `${initialBowlRect.left + (initialBowlRect.width / 2) - 15}px`;
    ball.style.display = 'block';

    ballPosition = Math.floor(Math.random() * 3)+1;

   
    setTimeout(() => {
       
        ball.style.top = `${initialBowlRect.top + 20}px`; 
        ball.style.display = 'none'; 

       
        const bowls = [1, 2, 3];
        for (let i = 0; i < 3; i++) {
            const bowl = document.getElementById(`bowl${bowls[i]}`);
            bowl.style.transform = 'translateY(-20px)';
        }
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                const bowl = document.getElementById(`bowl${bowls[i]}`);
                bowl.style.transform = 'translateY(0)';
            }

            gameOver = false;
            document.getElementById('bowl1').disabled = false;
            document.getElementById('bowl2').disabled = false;
            document.getElementById('bowl3').disabled = false;
        }, 1000);
    }, 2000); 
}

function checkBowl(bowlNumber) {
    const message = document.getElementById('message');
    if (gameOver) {
        return;
    }

    if (bowlNumber === ballPosition) {
        message.textContent = 'You found the ball! :)';
    } else {
        message.textContent = `Try again! :( The ball was under bowl ${ballPosition}. Please click the shuffle or play again button to play again.`;
    }
    gameOver = true;
    document.getElementById('bowl1').disabled = true;
    document.getElementById('bowl2').disabled = true;
    document.getElementById('bowl3').disabled = true;
    document.getElementById('playAgain').style.display = 'block';
}

function playAgain() {
    gameOver = false;
    shuffle();
}

shuffle();
