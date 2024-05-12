let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

let heads = 0;
let tails = 0;

const audio = new Audio();
audio.src = "sounds/coin-flip.mp3"

flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  //it will give i as 0 and 1
  coin.style.animation = "none";
  if (i) {
    setTimeout(function () {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(function () {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateStats, 3000);
  audio.play();
  disableBtn();
});

function updateStats() {
  document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
  document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

function disableBtn() {
  flipBtn.disabled = true;
  setTimeout(() => {
    flipBtn.disabled = false;
  }, 3000);
}

resetBtn.addEventListener('click', () => {
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
})