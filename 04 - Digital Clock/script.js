const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");

// Add 0 to the begining of number if less than 10
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function clock() {
  const date = new Date();

  let h = formatTime(date.getHours());
  let m = formatTime(date.getMinutes());
  let s = formatTime(date.getSeconds());
  let am = "AM";

  // Conver 24 hour time to 12 hour format with AM/PM Indicator
  if (h > 12) {
    h = h - 12;
    am = "PM";
  }

  hour.textContent = h;
  minute.textContent = m;
  seconds.textContent = s;
  ampm.textContent = am;
}

setInterval(clock, 1000);
