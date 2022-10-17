const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");

// Add 0 to the begining of number if less than 10
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function isAmPm(hours) {
  return hours >= 12 ? "PM" : "AM";
}

function clock() {
  const date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  hour.textContent = formatTime(h);
  minute.textContent = formatTime(m);
  seconds.textContent = formatTime(s);
  ampm.textContent = isAmPm(h);
}

setInterval(clock, 1000);
