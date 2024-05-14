const weatherApi = {
  key: "828cc99e0335c9476a8f751b7c386d9a",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
let dat,lat,long;

window.addEventListener('load', () => {
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description } = data.weather[0];

          const fahrenheit = (temp * 9) / 5 + 32;

          // Interacting with DOM to show data
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          //  tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          showWeatherImage(desc);
        });
    });

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress' , async (event) => {
    if (event.keyCode === 13) {
        console.log(searchInputBox.value);
        await getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

const searchButton = document.getElementById('button');
searchButton.addEventListener("click",()=>{
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
})

async function getWeatherReport(city){
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if(!response.ok) {
            throw new Error('Error while getting the weather report');
        }
        showWeatherReport(data);
        lat = data.coord.lat;
        long = data.coord.lon;
        await fetching();
    } catch(err) {
        console.error(err);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById('city').innerText = 'Country/City Name Not Found';
    // clear previous output
    document.getElementById('date').innerText = '';
    document.getElementById('temp').innerText = '';
    document.getElementById('min-max').innerText = '';
    document.getElementById('weather').innerText = '';
}

function showWeatherImage(WeatherType) {
    if(WeatherType.textContent === 'Clear') {
        document.body.style.backgroundImage = "url('clear1.jpg')"
    }
    else if(WeatherType.textContent === 'Clouds') {
        document.body.style.backgroundImage = "url('clouds.jpg')"
    }
    else if(WeatherType.textContent === 'Haze') {
        document.body.style.backgroundImage = "url('clouds.jpg')"
    }
    else if(WeatherType.textContent === 'Rain') {
        document.body.style.backgroundImage = "url('rain.jpg')"
    }
    else if(WeatherType.textContent === 'Snow') {
        document.body.style.backgroundImage = "url('snow.jpg')"
    }
    else if(WeatherType.textContent === 'Thunderstorm') {
        document.body.style.backgroundImage = "url('thunder.jpg')"
    }
    else if(WeatherType.textContent === 'Sunny') {
        document.body.style.backgroundImage = "url('sunny.jpg')"
    }
}

var imag = document.createElement("img");
imag.src = "icons8-humidity-64.png";
var src = document.getElementById("himg");
src.appendChild(imag);

var imag = document.createElement("img");
imag.src = "icons8-wind-64.png";
var src = document.getElementById("wimg");
src.appendChild(imag);

var imag = document.createElement("img");
imag.src = "gauge (1).png";
var src = document.getElementById("pimg");
src.appendChild(imag);

function showWeatherReport(weather){
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_min)}&deg;C (max)`;

    let WeatherType = document.getElementById('weather');
    WeatherType.innerText = `${weather.weather[0].main}`;

    let humidity = document.getElementById('humidity');
    humidity.innerText = `${weather.main.humidity}%`;

    let wind = document.getElementById('wind');
    wind.innerText = `${weather.wind.speed} kmph`;

    let press = document.getElementById('pressure');
    press.innerText = `${weather.main.pressure} bar`;
    
    let date = document.getElementById('date');
    let todayDate = new Date();
    //console.log(todayDate);
    date.innerText = dateManage(todayDate);
    showWeatherImage(WeatherType);
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

async function fetching(){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`);
        const data = response.json();

        if(!response.ok) {
            throw new Error('Error while fetching the weather')
        }
        dat = data;
        google.charts.load('current',{packages:['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    } catch(err) {
        console.error(err);
    }
}

function drawChart() {
  let unix_time_0 = dat.hourly[0].dt;
  let unix_time_1 = dat.hourly[1].dt;
  let unix_time_2 = dat.hourly[2].dt;
  let unix_time_3 = dat.hourly[3].dt;
  let unix_time_4 = dat.hourly[4].dt;
  let unix_time_5 = dat.hourly[5].dt;
  let unix_time_6 = dat.hourly[6].dt;
  let unix_time_7 = dat.hourly[7].dt;
  let unix_time_8 = dat.hourly[8].dt;
  let unix_time_9 = dat.hourly[9].dt;
  let unix_time_10 = dat.hourly[10].dt;
  let unix_time_11 = dat.hourly[11].dt;

  const hour0 = format(new Date(unix_time_0 * 1000));
  const hour1 = format(new Date(unix_time_1 * 1000));
  const hour2 = format(new Date(unix_time_2 * 1000));
  const hour3 = format(new Date(unix_time_3 * 1000));
  const hour4 = format(new Date(unix_time_4 * 1000));
  const hour5 = format(new Date(unix_time_5 * 1000));
  const hour6 = format(new Date(unix_time_6 * 1000));
  const hour7 = format(new Date(unix_time_7 * 1000));
  const hour8 = format(new Date(unix_time_8 * 1000));
  const hour9 = format(new Date(unix_time_9 * 1000));
  const hour10 = format(new Date(unix_time_10 * 1000));
  const hour11 = format(new Date(unix_time_11 * 1000));

  // Set Data
  const data = google.visualization.arrayToDataTable([
      ['Time', 'Temperature', { role: 'style' }],
      [hour0,Math.floor(dat.hourly[0].temp),'color:black'],[hour1,Math.floor(dat.hourly[1].temp),'color:black'],
      [hour2,Math.floor(dat.hourly[2].temp),'color:black'],[hour3,Math.floor(dat.hourly[3].temp),'color:black'],
      [hour4,Math.floor(dat.hourly[4].temp),'color:black'],[hour5,Math.floor(dat.hourly[5].temp),'color:black'],
      [hour6,Math.floor(dat.hourly[6].temp),'color:black'],[hour7,Math.floor(dat.hourly[7].temp),'color:black'],
      [hour8,Math.floor(dat.hourly[8].temp),'color:black'],[hour9,Math.floor(dat.hourly[9].temp),'color:black'],
      [hour10,Math.floor(dat.hourly[10].temp),'color:black'],[hour11,Math.floor(dat.hourly[11].temp),'color:black']
  ]);
  // Set Options
  const options = {
      title: 'time vs. temperature',
      hAxis: {title: 'Time in Hours'},
      vAxis: {title: 'Temperature in °C'},
      legend: 'none',
      tooltip: {isHtml: true},
      backgroundColor: 'transparent',
      color : 'black',
      is3D : true,
      allowHtml: true,
  };
  // Draw
  document.querySelector("#myChart").style.display = "block";
  const chart = new google.visualization.AreaChart(document.getElementById('myChart'));
  chart.draw(data, options);
}

function format(date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return hours + ' ' + ampm;
}

window.onresize = (function(){
  drawChart();
});
