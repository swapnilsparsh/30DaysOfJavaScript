const timezones = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
  "Africa/Cairo",
  "Asia/Shanghai",
  "America/Chicago",
  "America/Toronto",
  "Europe/Paris",
  "Africa/Johannesburg",
  "Asia/Hong_Kong",
  "America/Mexico_City",
  "Asia/Singapore",
  "America/Sao_Paulo",
  "Europe/Moscow",
  "America/Buenos_Aires",
  "Asia/Jerusalem",
  "Pacific/Auckland",
  "Pacific/Honolulu",
  "Asia/Seoul",
  "Asia/Bangkok",
  "America/Phoenix",
  "America/Denver",
  "Africa/Nairobi",
  "Asia/Riyadh",
  "Europe/Stockholm",
  "Asia/Kuwait",
  "America/Anchorage",
  "Europe/Istanbul",
  "Asia/Kuala_Lumpur",
  "Asia/Taipei",
  "Australia/Perth",
  "America/Vancouver",
  "Asia/Manila",
  "Europe/Amsterdam",
  "America/Lima",
  "Asia/Dhaka",
  "America/Bogota",
  "America/Montreal",
  "Asia/Kolkata",
  "Asia/Baghdad",
];

function getDate(timeZone) {
  const options = {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date().toLocaleString("en-US", options);
}

function getHours(timeZone) {
  const options = { timeZone, hour: "numeric" };
  return parseInt(
    new Intl.DateTimeFormat("en-US", options).format(new Date()),
    10
  );
}

function getMinutes(timeZone) {
  const options = { timeZone, minute: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function getSeconds(timeZone) {
  const options = { timeZone, second: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function updateClock() {
  const h = document.querySelector(".hr");
  const m = document.querySelector(".mn");
  const s = document.querySelector(".ss");
  const cur = document.querySelector(".digital");
  const selectedTimezone = document.querySelector("#timeZoneSelect").value;

  const date = getDate(timezones[selectedTimezone]);
  const hours = getHours(timezones[selectedTimezone])
    .toString()
    .padStart(2, "0");
  const minutes = getMinutes(timezones[selectedTimezone]);
  const minutesFormatted = minutes.toString().padStart(2, "0");
  const seconds = getSeconds(timezones[selectedTimezone]);
  const secondsFormatted = seconds.toString().padStart(2, "0");

  const timePeriod = date.slice(-2);

  h.style.transform = `rotate(${30 * hours + minutes / 2}deg)`;
  m.style.transform = `rotate(${6 * minutes}deg)`;
  s.style.transform = `rotate(${6 * seconds}deg)`;
  cur.innerHTML = `<p>${hours} : ${minutesFormatted} : ${secondsFormatted}  ${timePeriod}</p>`;
}

setInterval(updateClock, 100);
