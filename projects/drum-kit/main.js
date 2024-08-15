const keys = Array.from(document.querySelectorAll('.key'));

const keyCode = {
  A: 65,
  S: 83,
  D: 68, 
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};

document.addEventListener('keyup',()=>{
  keys.forEach((key)=>{
    key.classList.remove('playing');
  })
})

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(
    `audio[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`
  );

  const key = document.querySelector(
    `div[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`
  );

  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}


keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);

keys.forEach((key) =>
  key.addEventListener('click', (e) => {
    playSound(e);
  })
);