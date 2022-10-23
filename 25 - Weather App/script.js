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
  }).then((data) => {
    showWeatherReport(data);
    lat = data.coord.lat;
    long = data.coord.lon;
    fetching();
  });
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

function fetching(){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`)
  .then(response => response.json())
  .then((data) =>{
      dat = data;
      google.charts.load('current',{packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);
  });
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
  
  var hour0 = new Date(unix_time_0 * 1000);
  var hour1 = new Date(unix_time_1 * 1000);
  var hour2 = new Date(unix_time_2 * 1000);
  var hour3 = new Date(unix_time_3 * 1000);
  var hour4 = new Date(unix_time_4 * 1000);
  var hour5 = new Date(unix_time_5 * 1000);
  var hour6 = new Date(unix_time_6 * 1000);
  var hour7 = new Date(unix_time_7 * 1000);
  var hour8 = new Date(unix_time_8 * 1000);
  var hour9 = new Date(unix_time_9 * 1000);
  var hour10 = new Date(unix_time_10 * 1000);
  var hour11= new Date(unix_time_11 * 1000);

  hour0 = format(hour0);
  hour1 = format(hour1);
  hour2 = format(hour2);
  hour3 = format(hour3);
  hour4 = format(hour4);
  hour5 = format(hour5);
  hour6 = format(hour6);
  hour7 = format(hour7);
  hour8 = format(hour8);
  hour9 = format(hour9); 
  hour10 = format(hour10); 
  hour11 = format(hour11); 
  // Set Data
  var data = google.visualization.arrayToDataTable([
      ['Time', 'Temperature', { role: 'style' }],
      [hour0,Math.floor(dat.hourly[0].temp),'color:black'],[hour1,Math.floor(dat.hourly[1].temp),'color:black'],
      [hour2,Math.floor(dat.hourly[2].temp),'color:black'],[hour3,Math.floor(dat.hourly[3].temp),'color:black'],
      [hour4,Math.floor(dat.hourly[4].temp),'color:black'],[hour5,Math.floor(dat.hourly[5].temp),'color:black'],
      [hour6,Math.floor(dat.hourly[6].temp),'color:black'],[hour7,Math.floor(dat.hourly[7].temp),'color:black'],
      [hour8,Math.floor(dat.hourly[8].temp),'color:black'],[hour9,Math.floor(dat.hourly[9].temp),'color:black'],
      [hour10,Math.floor(dat.hourly[10].temp),'color:black'],[hour11,Math.floor(dat.hourly[11].temp),'color:black']
  ]);
  // Set Options
  var options = {
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
  var chart = new google.visualization.AreaChart(document.getElementById('myChart'));
  chart.draw(data, options);
}
function format(date) {
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strTime = hours + ' ' + ampm;
  return strTime;
}
window.onresize = (function(){
  drawChart();
});









