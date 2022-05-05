const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let moves = 30;
let match = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  moves--;
  document.getElementById("moves").innerHTML = moves;
  if(moves === 0){
    document.querySelector(".popup").style.display="flex";
    document.querySelector(".popup > div > h2").innerHTML="GAME OVER <br> You Lose!! &#128577";
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();

  if(isMatch) match++;
  if(match === 8){    
    document.querySelector(".popup").style.display="flex";
    document.querySelector(".popup > div > h2").innerHTML="Congratulations... <br> You Won!! &#128515"
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

