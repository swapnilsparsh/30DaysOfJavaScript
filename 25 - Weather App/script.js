const weatherApi = {
  key: "828cc99e0335c9476a8f751b7c386d9a",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');

window.addEventListener('load', () => {
  let long;
  let lat;
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, feels_like } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];

          const fahrenheit = (temp * 9) / 5 + 32;

          // Interacting with DOM to show data
          loc.textContent = `${place}`;
           desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          //  tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          if(desc.textContent=='clear'){
            document.body.style.backgroundImage= "url('Clear1.jpg')";
        }else if(desc.textContent=='clouds'){
            document.body.style.backgroundImage= "url('Cloudy.jpg')";
        }
        else if(desc.textContent=='rain'){
            document.body.style.backgroundImage= "url('rain.jpg')";
        }
        else if(desc.textContent=='mist'){
          document.body.style.backgroundImage= "url('rain.jpg')";
      }
        else if(desc.textContent=='haze'){
            document.body.style.backgroundImage= "url('Cloudy.jpg')";
        }
        else if(desc.textContent=='snow'){
            document.body.style.backgroundImage= "url('snow.jpg')";
        }
        else if(desc.textContent=='thunderstorm'){
            document.body.style.backgroundImage= "url('thunder.jpg')";
        }
        });
    });


const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress' , (event) => {
  if(event.keyCode == 13) {

      console.log(searchInputBox.value);
      getWeatherReport(searchInputBox.value);
      document.querySelector('.weather-body').style.display = "block";

  }
});

function getWeatherReport(city){
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
  .then(weather => {
      return weather.json();
  }).then(showWeatherReport);
}

function showWeatherReport(weather){
  console.log(weather);

  let city = document.getElementById('city');
  city.innerText = `${weather.name},${weather.sys.country}`;

  let temperature = document.getElementById('temp');
temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

let minMaxTemp = document.getElementById('min-max');
minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_min)}&deg;C (max)`;

let WeatherType = document.getElementById('weather');
WeatherType.innerText = `${weather.weather[0].main}`;

let date = document.getElementById('date');
let todayDate = new Date();
//console.log(todayDate);
date.innerText = dateManage(todayDate);

if(WeatherType.textContent == 'Clear') {
    document.body.style.backgroundImage = "url('clear1.jpg')"
}
else if(WeatherType.textContent == 'Clouds') {
    document.body.style.backgroundImage = "url('clouds.jpg')"
}
  else if(WeatherType.textContent == 'Haze') {
      document.body.style.backgroundImage = "url('clouds.jpg')"
  }
else if(WeatherType.textContent == 'Rain') {
    document.body.style.backgroundImage = "url('rain.jpg')"
}
else if(WeatherType.textContent == 'Snow') {
    document.body.style.backgroundImage = "url('snow.jpg')"
}
else if(WeatherType.textContent == 'Thunderstorm') {
    document.body.style.backgroundImage = "url('thunder.jpg')"
}
else if(WeatherType.textContent == 'Sunny') {
    document.body.style.backgroundImage = "url('sunny.jpg')"
}
}

function dateManage(dateArg){
  let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let months = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];

  let year = dateArg.getFullYear();
  let month= months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;


}











