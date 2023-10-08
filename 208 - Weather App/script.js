const locationInput = document.querySelector("#locationInput");
const fetchWeatherButton = document.querySelector("#fetchWeather");
const weatherInfo = document.querySelector("#weatherInfo");

fetchWeatherButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location === "") {
    alert("Please enter a location");
    return;
  }

  const apiKey = "f767a695fe8842e11f563041114151b6";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey +
    "&units=metric";
    // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f767a695fe8842e11f563041114151b6&units=metric`

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        processData(data);
    })
    .catch((error) => {
      console.error("Error fetching weather: ", error);
    });
});

function processData(data) {
  const cityName = data.name;
  const temperature = (data.main.temp).toFixed(2);
  const description = data.weather[0].description;

  const weatherHTML = `
        <h2 class="text-xl font-semibold mb-2">${cityName}</h2>
        <p class="text-lg mb-2">${temperature}°C</p>
        <p class="text-lg">${description}</p>`;

    weatherInfo.innerHTML = weatherHTML;
}
