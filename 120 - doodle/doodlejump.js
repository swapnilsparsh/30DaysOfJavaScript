let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = boardHeight * 7 / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight
}

// physics
let velocityX = 0;
let velocityY = 0; // doodler jump speed
let initialVelocityY = -8; // starting velocity Y
let gravity = 0.4;

// platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;
let animationId;

// time tracking for speed increase
let timeElapsed = 0;
const speedIncreaseInterval = 1000; // in milliseconds
const velocityIncreaseStep = -0.1; // smaller step for gradual increase
const gravityIncreaseStep = 0.005; // smaller step for gradual increase

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    // load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "./doodler-right.png";
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function () {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./doodler-left.png";

    platformImg = new Image();
    platformImg.src = "./platform.png";

    // Get the modal
    var modal = document.getElementById("instructionsModal");

    // Get the button that opens the modal
    var btn = document.getElementById("startButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        startGame();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            startGame();
        }
    }

    document.addEventListener("keydown", moveDoodler);
}

function startGame() {
    cancelAnimationFrame(animationId); // Cancel any previous animation frame
    velocityY = initialVelocityY;
    placePlatforms();
    gameOver = false;
    score = 0;
    maxScore = 0;
    timeElapsed = 0; // Reset time elapsed
    initialVelocityY = -8; // Reset initial velocity
    gravity = 0.4; // Reset gravity
    animationId = requestAnimationFrame(update);
}

function update() {
    if (gameOver) {
        return;
    }
    animationId = requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Increase speed over time
    timeElapsed += 16; // Approximate time for each frame at 60fps
    if (timeElapsed >= speedIncreaseInterval) {
        initialVelocityY += velocityIncreaseStep;
        gravity += gravityIncreaseStep;
        timeElapsed = 0; // Reset time elapsed after increment
    }

    // doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth) {
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width < 0) {
        doodler.x = boardWidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height) {
        gameOver = true;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    // platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && doodler.y < boardHeight * 3 / 4) {
            platform.y -= initialVelocityY; // slide platform down
        }
        if (detectCollision(doodler, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; // jump
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // clear platforms and add new platform
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift(); // removes first element from the array
        newPlatform(); // replace with new platform on top
    }

    // score
    updateScore();
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.textAlign = "center";
    context.fillText(score, boardWidth / 2, 20);

    if (gameOver) {
        context.fillText("Game Over: Press 'Space' to Restart", boardWidth / 2, boardHeight * 7 / 8);
    }
}

function moveDoodler(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") { // move right
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") { // move left
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
    else if (e.code == "Space" && gameOver) {
        // reset
        doodler = {
            img: doodlerRightImg,
            x: doodlerX,
            y: doodlerY,
            width: doodlerWidth,
            height: doodlerHeight
        }

        velocityX = 0;
        velocityY = initialVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false;
        placePlatforms();
        cancelAnimationFrame(animationId); // Cancel any previous animation frame
        timeElapsed = 0; // Reset time elapsed
        initialVelocityY = -8; // Reset initial velocity
        gravity = 0.4; // Reset gravity
        animationId = requestAnimationFrame(update); // Restart the game loop
    }
}

function placePlatforms() {
    platformArray = [];

    // starting platforms
    let platform = {
        img: platformImg,
        x: boardWidth / 2,
        y: boardHeight - 50,
        Width: platformWidth,
        height: platformHeight
    };

    platformArray.push(platform);

    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * boardWidth * 3 / 4); // (0-1) * boardWidth*3/4
        let platform = {
            img: platformImg,
            x: randomX,
            y: boardHeight - 75 * i - 150,
            width: platformWidth,
            height: platformHeight
        };

        platformArray.push(platform);
    }
}

function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth * 3 / 4); // (0-1) * boardWidth*3/4
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    };

    platformArray.push(platform);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x && // a's top right corner passes b's top left corner
        a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}

function updateScore() {
    let points = Math.floor(50 * Math.random()); // (0-1) *50 --> (0-50)
    if (velocityY < 0) { // negative going up
        maxScore += points;
        if (score < maxScore) {
            score = maxScore;
        }
    } else if (velocityY >= 0) {
        maxScore -= points;
    }
}

