/*Color of the snails Start  */
const snails = [
    { color: 'red', position: 0 },
    { color: 'blue', position: 0 },
    { color: 'green', position: 0 },
    { color: 'yellow', position: 0 },
    { color: 'purple', position: 0 },
    { color: 'orange', position: 0 }
];
/*Color of the snails Start  */
const rollButton = document.getElementById('roll-button');
const restartButton = document.getElementById('restart-button');

function rollDie() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    rollButton.style.backgroundColor = randomColor;

    const snail = snails.find(s => s.color === randomColor);
    snail.position++;

    const squares = document.querySelectorAll(`.board .${snail.color}`);
    squares.forEach((square, index) => {
        if (index === snail.position) {
            square.textContent = '🐌';
        } else {
            square.textContent = '';
        }
    });

    if (snail.position === 11) {
        const winningTrack = document.querySelector(`.board .${snail.color}`).parentNode;
        winningTrack.classList.add('winning-track');
        const squaresInTrack = winningTrack.querySelectorAll('.square');
        for (let i = 0; i < squaresInTrack.length - 1; i++) {
            squaresInTrack[i].textContent = 'WINNERSNAIL'[i];
        }

        rollButton.style.display = 'none';
        restartButton.style.display = 'block';
    }
}

function restartGame() {
const winningTrack = document.querySelector('.winning-track');
if (winningTrack) {
winningTrack.classList.remove('winning-track');
const squaresInTrack = winningTrack.querySelectorAll('.square');
squaresInTrack.forEach((square, index) => {
    if (index === squaresInTrack.length - 1) {
        square.textContent = '🐌';
    } else {
        square.textContent = '';
    }
});
}

snails.forEach(snail => {
snail.position = 0;
const squares = document.querySelectorAll(`.board .${snail.color}`);
squares[0].textContent = '🐌';
for (let i = 1; i < squares.length; i++) {
    squares[i].textContent = '';
}
});

rollButton.style.backgroundColor = '#3498db';
rollButton.style.display = 'block';
restartButton.style.display = 'none';
}
