const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.move'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('.controls button:first-of-type'),
    restart: document.getElementById('restart-btn'),
    win: document.querySelector('.win')
};

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};


const shuffle = array => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[i]];
    }
    return clonedArray;
};


const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray.splice(randomIndex, 1)[0]);
    }
    return randomPicks;
};


const generateGame = () => {
    const dimensions = parseInt(selectors.board.getAttribute('data-dimension'), 10);

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    }

    const emojis = ['🌹','🌺','🪷','💐','🪻','🌻','🌼','🥀','🌷','🌸'];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);

    const cards = items.map(item => `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back">${item}</div>
        </div>
    `).join('');

    selectors.board.innerHTML = cards;
    selectors.board.style.gridTemplateColumns = `repeat(${dimensions}, auto)`;
};


const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');
    selectors.restart.classList.remove('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `Time: ${state.totalTime} sec`;
    }, 1000);
};


const restartGame = () => {

    state.gameStarted = false;
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;

    clearInterval(state.loop);

  
    selectors.start.classList.remove('disabled');
    selectors.restart.classList.add('disabled');
    selectors.moves.innerText = `0 moves`;
    selectors.timer.innerText = `Time: 0 sec`;


    generateGame();
};


const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });
    state.flippedCards = 0;
};


const flipCard = card => {
    if (!state.gameStarted) {
        startGame();
    }

    if (!card.classList.contains('flipped') && state.flippedCards < 2) {
        card.classList.add('flipped');
        state.flippedCards++;
        state.totalFlips++;
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.querySelector('.card-back').innerText === card2.querySelector('.card-back').innerText) {
                card1.classList.add('matched');
                card2.classList.add('matched');
            }
        }

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }

    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;
            clearInterval(state.loop);
        }, 1000);
    }
};


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const target = event.target;
        const card = target.closest('.card');

        if (card && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            flipCard(card);
        } else if (target === selectors.start && !selectors.start.classList.contains('disabled')) {
            startGame();
        } else if (target === selectors.restart && !selectors.restart.classList.contains('disabled')) {
            restartGame();
        }
    });
};


generateGame();
attachEventListeners();