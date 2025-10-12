const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let score = 0;
let lives = 3;
let timeRemaining = 60;
let gameOver = false;
let mushrooms = [];
let flowers = [];
let character = { x: 200, y: 200, size: 10 };

// Colors
const flowerColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
const mushroomColors = { cap: '#E74C3C', stem: '#F5DEB3' };

// Initialize mushrooms
function initMushrooms() {
    mushrooms = [];
    for (let i = 0; i < 5; i++) {
        mushrooms.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30
        });
    }
}

// Draw mushroom
function drawMushroom(x, y) {
    // Cap
    ctx.fillStyle = mushroomColors.cap;
    ctx.beginPath();
    ctx.ellipse(x, y - 10, 15, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // White spots
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 5, y - 12, 3, 0, Math.PI * 2);
    ctx.arc(x + 5, y - 8, 2, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.fillStyle = mushroomColors.stem;
    ctx.fillRect(x - 5, y, 10, 20);
}

// Draw flower
function drawFlower(x, y) {
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    
    // Petals
    ctx.fillStyle = color;
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const petalX = x + Math.cos(angle) * 8;
        const petalY = y + Math.sin(angle) * 8;
        ctx.beginPath();
        ctx.arc(petalX, petalY, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Center
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 15);
    ctx.stroke();
}

// Draw character
function drawCharacter() {
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(character.x, character.y, character.size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Outline
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Check collision between character and mushroom
function checkCollision(mouseX, mouseY, mushroom) {
    const distance = Math.sqrt(
        Math.pow(mouseX - mushroom.x, 2) + 
        Math.pow(mouseY - mushroom.y, 2)
    );
    return distance < 20; // Collision radius
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw flowers
    flowers.forEach(flower => {
        drawFlower(flower.x, flower.y);
    });

    // Draw mushrooms
    mushrooms.forEach(mushroom => {
        drawMushroom(mushroom.x, mushroom.y);
    });

    // Draw character
    drawCharacter();
}

// Update UI
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = timeRemaining;
}

// Handle click
canvas.addEventListener('click', (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move character
    character.x = x;
    character.y = y;

    // Check mushroom collision
    let hitMushroom = false;
    mushrooms = mushrooms.filter(mushroom => {
        if (checkCollision(x, y, mushroom)) {
            lives--;
            updateUI();
            hitMushroom = true;
            
            if (lives <= 0) {
                endGame('Game Over! 💀');
            }
            return false;
        }
        return true;
    });

    // If didn't hit mushroom, plant flower
    if (!hitMushroom) {
        flowers.push({ x, y });
        score++;
        updateUI();
    }

    // Respawn mushrooms
    if (mushrooms.length < 5) {
        mushrooms.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30
        });
    }

    draw();
});

// Timer
function startTimer() {
    const timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer);
            return;
        }

        timeRemaining--;
        updateUI();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame("Time's Up! ⏰");
        }
    }, 1000);
}

// End game
function endGame(message) {
    gameOver = true;
    document.getElementById('finalMessage').textContent = message;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverScreen').style.display = 'block';
}

// Restart game
function restartGame() {
    score = 0;
    lives = 3;
    timeRemaining = 60;
    gameOver = false;
    flowers = [];
    character = { x: 200, y: 200, size: 10 };
    
    document.getElementById('gameOverScreen').style.display = 'none';
    
    initMushrooms();
    updateUI();
    draw();
    startTimer();
}

// Initialize game
initMushrooms();
draw();
updateUI();
startTimer();
