const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

let ballX = canvas.width / 2;
let ballY = ballRadius;
let ballDX = 2;
let ballDY = 2;
let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.getElementById('leftBtn').addEventListener('click', () => { leftPressed = true; });
document.getElementById('rightBtn').addEventListener('click', () => { rightPressed = true; });
document.getElementById('playAgainBtn').addEventListener('click', resetGame);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    paddleX = (canvas.width - paddleWidth) / 2;
    ballX = canvas.width / 2;
    ballY = ballRadius;
});

canvas.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    if (touchX > paddleX + paddleWidth / 2) {
        rightPressed = true;
    } else {
        leftPressed = true;
    }
});

canvas.addEventListener('touchend', (e) => {
    rightPressed = false;
    leftPressed = false;
});

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }

    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
            score++;
        } else {
            endGame();
            return;
        }
    }

    requestAnimationFrame(draw);
}

function endGame() {
    alert('Game Over! Your score is: ' + score);
    document.getElementById('playAgainBtn').style.display = 'inline-block';
}

function resetGame() {
    score = 0;
    ballX = canvas.width / 2;
    ballY = ballRadius;
    ballDX = 2;
    ballDY = 2;
    document.getElementById('playAgainBtn').style.display = 'none';
    draw();
}

draw();
