let newDate = new Date();
let daYs = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let daY = document.querySelector("#day");
let daYes = daYs[newDate.getDay()];
let houR = newDate.getHours();
if (houR < 10) {
  houR = `0${houR}`;
}
let miN = newDate.getMinutes();
if (miN < 10) {
  miN = `0${miN}`;
}
daY.innerHTML = `${daYes}    ${houR}:${miN}`;

function showWeather(response) {
  document.querySelector("h3").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humid").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  document.querySelector("#descrip").innerHTML =
    response.data.condition.description;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "6b4f3dae57b3ed708ofd511b96092atd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#floatingInput").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "6b4f3dae57b3ed708ofd511b96092atd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "6b4f3dae57b3ed708ofd511b96092atd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col">
          <div class="day">${formatDay(day.time)}</div>
          <div class="icon">
            <img src="${day.condition.icon_url}" alt="">
          </div>
          <div class="temperature">
            <strong> ${Math.round(
              day.temperature.maximum
            )}º </strong>${Math.round(day.temperature.minimum)}º
          </div> 
        </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getLocation);

searchCity("Delhi");