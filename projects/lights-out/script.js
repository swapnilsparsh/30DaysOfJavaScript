function createGrid(rows, cols) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear any existing grid

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const light = document.createElement('div');
            light.classList.add('light');
            light.dataset.row = r;
            light.dataset.col = c;
            light.addEventListener('click', () => toggleLights(r, c));
            grid.appendChild(light);
            grid.style.gridTemplateColumns = `repeat(${level}, 60px)`;
        }
    }
}

function toggleLights(row, col) {
    toggleLight(row, col);
    toggleLight(row - 1, col); // Up
    toggleLight(row + 1, col); // Down
    toggleLight(row, col - 1); // Left
    toggleLight(row, col + 1); // Right
    checkWin();
}

function toggleLight(row, col) {
    const light = document.querySelector(`.light[data-row='${row}'][data-col='${col}']`);
    if (light) {
        light.classList.toggle('off');
    }

}

function resetGame() {
    const lights = document.querySelectorAll('.light');
    lights.forEach(light => light.classList.remove('off'));
}

let level = 3;
const levelLimit = 9;

function startGame() {
    createGrid(level, level);
    const lights = document.querySelectorAll('.light');
}

function checkWin() {
    const lights = document.querySelectorAll('.light');
    const isWin = Array.from(lights).every(light => light.classList.contains('off'));
    if (isWin) {
        if (level === levelLimit) {
            alert('Congratulations! You have won all the levels!');
        } else {
            alert('You win!');
            level++; // Increase the level
            resetGame();
            startGame(); // Start the next level
        }
    }
}