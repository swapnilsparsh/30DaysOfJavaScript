const colors = ['#e57373', '#81c784', '#64b5f6', '#ffd54f', '#ba68c8', '#ff8a65'];
let gridSize = 3;
let sequence = [];
let userSequence = [];
let level = 0;

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const startButton = document.getElementById('start-button');
    const gridSizeSelect = document.getElementById('grid-size');
    const status = document.getElementById('status');

    // Start button click event
    startButton.addEventListener('click', startGame);

    // Grid size change event
    gridSizeSelect.addEventListener('change', (e) => {
        gridSize = parseInt(e.target.value);
        createGrid();
    });

    // Square click event
    gridContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('grid-square')) {
            handleSquareClick(e.target.dataset.index);
        }
    });

    function createGrid() {
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const square = document.createElement('div');
            square.classList.add('grid-square');
            square.dataset.index = i;
            gridContainer.appendChild(square);
        }
    }

    function startGame() {
        level = 0;
        sequence = [];
        userSequence = [];
        status.textContent = 'Game started!';
        nextLevel();
    }

    function nextLevel() {
        level++;
        userSequence = [];
        const randomSquare = Math.floor(Math.random() * gridSize * gridSize);
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push({ index: randomSquare, color: newColor });
        displaySequence();
    }

    function displaySequence() {
        let i = 0;
        const interval = setInterval(() => {
            const squareData = sequence[i];
            const square = document.querySelector(`[data-index='${squareData.index}']`);
            showColor(square, squareData.color);
            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
            }
        }, 1000);
    }

    function showColor(square, color) {
        const originalColor = square.style.backgroundColor;
        square.style.backgroundColor = color;
        setTimeout(() => {
            square.style.backgroundColor = originalColor;
        }, 500);
    }

    function handleSquareClick(index) {
        if (userSequence.length < sequence.length) {
            const square = document.querySelector(`[data-index='${index}']`);
            const squareData = sequence[sequence.length - userSequence.length - 1];
            showColor(square, squareData.color);
            userSequence.push({ index: parseInt(index), color: squareData.color });

            // Check the sequence after each click
            if (!checkPartialSequence()) {
                status.textContent = 'Wrong! Try again.';
                resetGame();
                return;
            }

            // If the full sequence is entered, validate it
            if (userSequence.length === sequence.length) {
                if (checkSequence()) {
                    status.textContent = 'Correct! Next level...';
                    setTimeout(nextLevel, 1000);
                } else {
                    status.textContent = 'Wrong! Try again.';
                    resetGame();
                }
            }
        }
    }

    function checkPartialSequence() {
        // Check the user sequence against the reversed sequence up to the current length
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i].index !== sequence[sequence.length - 1 - i].index) {
                return false;
            }
        }
        return true;
    }

    function checkSequence() {
        // Check if the entire user sequence matches the reversed game sequence
        return userSequence.every((data, index) => data.index === sequence[sequence.length - 1 - index].index);
    }

    function resetGame() {
        sequence = [];
        userSequence = [];
        level = 0;
    }

    // Create the initial grid
    createGrid();
});
