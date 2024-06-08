document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const movesLeftDisplay = document.getElementById('moves-left');
    const startLevelButton = document.getElementById('start-level');
    const resetGameButton = document.getElementById('reset-game');
    const levelDisplay = document.getElementById('level');

    const levels = [
        { scoreLimit: 250, moves: 25 },
        { scoreLimit: 300, moves: 30 },
        { scoreLimit: 350, moves: 35 },
        { scoreLimit: 400, moves: 40 },
        { scoreLimit: 450, moves: 45 }
    ];
    const gridSize = 5;
    let tiles = [];
    let score = 0;
    let movesLeft = 0;
    let currentLevel = 0;

    startLevelButton.addEventListener('click', startLevel);
    resetGameButton.addEventListener('click', resetGame);

    function startLevel() {
        if (currentLevel < levels.length) {
            currentLevel++;
        } else {
            swal({
                title: 'You have completed all levels',
                text: 'Congratulations!',
                icon: 'success',
                button: 'OK'
            });
            resetGame();
            return;
        }
        const level = levels[currentLevel - 1];
        score = 0;
        movesLeft = level.moves;
        scoreDisplay.textContent = `Score: ${score}`;
        movesLeftDisplay.textContent = `Moves Left: ${movesLeft}`;
        levelDisplay.textContent = `Level: ${currentLevel}`;
        createTiles();
        render();
    }

    function resetGame() {
        currentLevel = 0;
        score = 0;
        movesLeft = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        movesLeftDisplay.textContent = `Moves Left: ${movesLeft}`;
        levelDisplay.textContent = 'Level: ';
        gameBoard.innerHTML = '';
        tiles = [];
    }

    function createTiles() {
        const tileTypes = ['tile1', 'tile2', 'tile3', 'tile4', 'tile5'];
        tiles = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', tileTypes[Math.floor(Math.random() * tileTypes.length)]);
            tile.dataset.index = i;
            tile.addEventListener('click', handleTileClick);
            tiles.push(tile);
        }
    }

    function render() {
        gameBoard.innerHTML = '';
        tiles.forEach(tile => gameBoard.appendChild(tile));
    }

    let firstTile = null;
    let secondTile = null;

    function handleTileClick(event) {
        const tile = event.target;
        if (!firstTile) {
            firstTile = tile;
        } else if (!secondTile && tile !== firstTile) {
            secondTile = tile;
            if (areAdjacent(firstTile, secondTile)) {
                swapTiles(firstTile, secondTile);
                const matches = checkMatches();
                if (matches.length > 0) {
                    updateScore(matches);
                    clearMatches(matches);
                    dropTiles();
                    movesLeft--;
                    updateDisplays();
                } else {
                    setTimeout(() => swapTiles(firstTile, secondTile), 500); // Swap back if no match
                    movesLeft--;
                    updateDisplays();
                }
            }
            resetSelection();
        }
    }

    function areAdjacent(tile1, tile2) {
        const index1 = parseInt(tile1.dataset.index);
        const index2 = parseInt(tile2.dataset.index);
        const row1 = Math.floor(index1 / gridSize);
        const col1 = index1 % gridSize;
        const row2 = Math.floor(index2 / gridSize);
        const col2 = index2 % gridSize;
        return (row1 === row2 && Math.abs(col1 - col2) === 1) || (col1 === col2 && Math.abs(row1 - row2) === 1);
    }

    function swapTiles(tile1, tile2) {
        const index1 = parseInt(tile1.dataset.index);
        const index2 = parseInt(tile2.dataset.index);
        [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
        tiles[index1].dataset.index = index1;
        tiles[index2].dataset.index = index2;
        render();
    }

    function resetSelection() {
        firstTile = null;
        secondTile = null;
    }

    function checkMatches() {
        const matches = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const index = row * gridSize + col;
                const horizontalMatch = checkDirection(row, col, 0, 1).concat(checkDirection(row, col, 0, -1));
                if (horizontalMatch.length >= 2) {
                    matches.push(index, ...horizontalMatch);
                }
                const verticalMatch = checkDirection(row, col, 1, 0).concat(checkDirection(row, col, -1, 0));
                if (verticalMatch.length >= 2) {
                    matches.push(index, ...verticalMatch);
                }
            }
        }
        return [...new Set(matches)];
    }

    function checkDirection(row, col, rowStep, colStep) {
        const match = [];
        const tileClass = tiles[row * gridSize + col].className;
        for (let i = 1; i < gridSize; i++) {
            const newRow = row + i * rowStep;
            const newCol = col + i * colStep;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                const newIndex = newRow * gridSize + newCol;
                if (tiles[newIndex].className === tileClass) {
                    match.push(newIndex);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        return match;
    }

    function updateScore(matches) {
        if (matches.length >= 3) {
            score += matches.length * 5;
        }
    }

    function clearMatches(matches) {
        matches.forEach(index => {
            tiles[index].className = 'tile empty';
        });
    }

    function dropTiles() {
        for (let col = 0; col < gridSize; col++) {
            for (let row = gridSize - 1; row >= 0; row--) {
                let index = row * gridSize + col;
                if (tiles[index].classList.contains('empty')) {
                    for (let aboveRow = row - 1; aboveRow >= 0; aboveRow--) {
                        let aboveIndex = aboveRow * gridSize + col;
                        if (!tiles[aboveIndex].classList.contains('empty')) {
                            swapTiles(tiles[index], tiles[aboveIndex]);
                            break;
                        }
                    }
                }
            }
        }
        refillBoard();
    }

    function refillBoard() {
        const tileTypes = ['tile1', 'tile2', 'tile3', 'tile4', 'tile5'];
        tiles.forEach(tile => {
            if (tile.classList.contains('empty')) {
                tile.classList.remove('empty'); 
                tile.classList.add('tile', tileTypes[Math.floor(Math.random() * tileTypes.length)]);
                tile.dataset.index = tiles.indexOf(tile);
            }
        });
        render();
    }

    function updateDisplays() {
        scoreDisplay.textContent = `Score: ${score}`;
        movesLeftDisplay.textContent = `Moves Left: ${movesLeft}`;
        levelDisplay.textContent = `Level: ${currentLevel}`;
        const levelInfo = levels[currentLevel - 1];
        if (movesLeft <= 0 && score < levelInfo.scoreLimit) {
            swal({
                title: 'Game Over',
                text: 'You did not reach the score limit. Game will be reset.',
                icon: 'error',
                button: 'OK'
            });
            resetGame();
        } else if (score >= levelInfo.scoreLimit) {
            swal({
                title: 'Level Complete',
                text: 'Click Start Level to continue',
                icon: 'success',
                button: 'OK'
            });
            startLevel();
        }
    }
});