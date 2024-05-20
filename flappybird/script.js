document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const startScreen = document.getElementById('startScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    const GRAVITY = 0.3;
    const LIFT = -5;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 150;
    const PIPE_FREQUENCY = 90;
    const PIPE_SPEED = 1;
    const BIRD_SIZE = 20;

    let bird, pipes, score, frame;

    function initGame() {
        bird = { x: 50, y: canvas.height / 2, velocity: 0 };
        pipes = [];
        score = 0;
        frame = 0;
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        loop();
    }

    function loop() {
        update();
        render();
        if (!isGameOver()) {
            requestAnimationFrame(loop);
        } else {
            gameOver();
        }
    }

    function update() {
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;

        if (frame % PIPE_FREQUENCY === 0) {
            const pipeY = Math.random() * (canvas.height - PIPE_GAP);
            pipes.push({ x: canvas.width, y: pipeY });
        }

        pipes = pipes.map(pipe => {
            pipe.x -= 2;
            return pipe;
        }).filter(pipe => pipe.x + PIPE_WIDTH > 0);

        if (pipes.some(pipe => isCollision(pipe))) {
            bird.y = canvas.height - BIRD_SIZE;
        }

        score++;
        frame++;
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(bird.x, bird.y, BIRD_SIZE, BIRD_SIZE);

        ctx.fillStyle = 'green';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.y);
            ctx.fillRect(pipe.x, pipe.y + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.y - PIPE_GAP);
        });

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${Math.floor(score / 10)}`, 10, 20);
    }

    function isCollision(pipe) {
        return (
            bird.x < pipe.x + PIPE_WIDTH &&
            bird.x + BIRD_SIZE > pipe.x &&
            (bird.y < pipe.y || bird.y + BIRD_SIZE > pipe.y + PIPE_GAP)
        );
    }

    function isGameOver() {
        return bird.y > canvas.height - BIRD_SIZE || bird.y < 0 || pipes.some(pipe => isCollision(pipe));
    }

    function gameOver() {
        gameOverScreen.style.display = 'block';
        scoreDisplay.textContent = `Score: ${Math.floor(score / 10)}`;
    }

    canvas.addEventListener('click', () => {
        bird.velocity = LIFT;
    });

    startButton.addEventListener('click', initGame);
    restartButton.addEventListener('click', initGame);
});
