// SELECT PLAY AND PAUSE BUTTON
const play = document.querySelector(".play"),
  pause = document.querySelector(".pause");
// SELECT AUDIO ELEMENT
const audio = document.querySelector(".audio audio");

// PLAY AUDIO
play.addEventListener("click", () => {
  audio.play();
  update();
});
// PAUSE AUDIO
pause.addEventListener("click", () => {
  audio.pause();
});

// SELECT SEASONS AND THE VIDEO
const seasons = document.querySelectorAll(".season"),
  video = document.querySelector(".video video");
// CHANGE VIDEO
seasons.forEach((season) => {
  season.addEventListener("click", () => {
    video.src = season.getAttribute("video-src");
  });
});

// SELECT DURATION BUTTONS
const durations = document.querySelectorAll(".duration");

// DEFAULT AUDIO DURATION
let audioDuration = 120; // 2min

// CHANGE AUDIO DURATION
durations.forEach((duration) => {
  duration.addEventListener("click", () => {
    audioDuration = duration.getAttribute("audio-duration");
    update();
  });
});

// SELECT RECT and RMAINING TIME ELEMENT
const path = document.querySelector(".rect"),
  remainingTimeEl = document.querySelector(".audio-remaining-time");

// TOTAL LENGTH OF THE PATH (PERIMETER OF THE RECTANGLE)
const pathLength = path.getTotalLength();
// SET THE LENGTH OF A DASH TO pathLength
path.style.strokeDasharray = pathLength;

function update() {
  // STOP AUDIO
  if (audio.currentTime >= audioDuration) {
    audio.pause(); // pause audio
    audio.currentTime = 0; // stop audio
  }

  // PORTION PLAYED FROM THE AUDIO
  let portionPlayed = audio.currentTime / audioDuration;

  // STROKE DASHOFFSET IS PROPOTIONAL TO the portionPlayed
  path.style.strokeDashoffset = -portionPlayed * pathLength;

  // CALCULATE REMAINING TIME IN SEC
  let remainingTimeInSec = audioDuration - audio.currentTime;
  renderRemainingTime(remainingTimeInSec);

  if (!audio.paused) {
    requestAnimationFrame(update);
    console.log("update");
  }
}
update();

// RENDER REMAINING TIME
function renderRemainingTime(timeInSec) {
  let min = Math.floor(timeInSec / 60);
  let sec = Math.floor(timeInSec % 60);

  // IF min/sec is a single digit(ex:9) we add a zero before the digit. (ex: 9 becomes 09)
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  remainingTimeEl.innerHTML = `${min}:${sec}`;
}
