const api={
    key:"f6bf196015464b5fb8273e5522911cfc",
    base:"https://api.openweathermap.org/data/2.5/",
    base1: "https://api.openaq.org/v1/measurements"
    
} 

let o3V = document.querySelector('.air-parameters .o3')
let coV = document.querySelector('.air-parameters .co')
let so2V = document.querySelector('.air-parameters .s02')
let no2V = document.querySelector('.air-parameters .n02')
let pm10V = document.querySelector('.air-parameters .pm10')
let pm25V = document.querySelector('.air-parameters .pm25')

let o3T = document.querySelector('.last-update .o3-time')
let coT = document.querySelector('.last-update .co-time')
let so2T = document.querySelector('.last-update .s02-time')
let no2T = document.querySelector('.last-update .n02-time')
let pm10T = document.querySelector('.last-update .pm10-time')
let pm25T = document.querySelector('.last-update .pm25-time')


const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt)
{
    if(evt.keyCode==13)
    {
        getResults(searchbox.value);

    }
}
function getResults(query)
{
    try{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather=>{
         return weather.json();
     }).then(displayResults);
    } catch{
        alert('City Not Found')
    }

     
}
function displayResults_aq(ap)
{
    console.log(ap)
    
    let o3 = document.querySelector('.parameters-options .o3-value');
    o3.innerText = `${ap.results[0].value} µg/m³`;
    let co = document.querySelector('.parameters-options .co-value')
    co.innerText = `${ap.results[1].value} µg/m³`;
    let so2 = document.querySelector('.parameters-options .so2-value')
    so2.innerText = `${ap.results[2].value} µg/m³`;
    let no2 = document.querySelector('.parameters-options .no2-value')
    no2.innerText = `${ap.results[3].value} µg/m³`
    let pm10 = document.querySelector('.parameters-options .pm10-value')
    pm10.innerText = `${ap.results[4].value} µg/m³`;
    let pm25 = document.querySelector('.parameters-options .pm25-value')
    pm25.innerText = `${ap.results[5].value} µg/m³`;

    o3V.innerText = `${ap.results[0].parameter}`;
    coV.innerText = `${ap.results[1].parameter}`;
    so2V.innerText = `${ap.results[2].parameter}`;
    no2V.innerText = `${ap.results[3].parameter}`;
    pm10V.innerText = `${ap.results[4].parameter}`;
    pm25V.innerText = `${ap.results[5].parameter}`;

    o3T.innerText = `${ap.results[0].date.local}`;
    coT.innerText = `${ap.results[1].date.local}`;
    so2T.innerText = `${ap.results[2].date.local}`;
    no2T.innerText = `${ap.results[3].date.local}`;
    pm10T.innerText = `${ap.results[4].date.local}`;
    pm25T.innerText = `${ap.results[5].date.local}`;

}   

function displayResults(weather)
{
    try{
    fetch(`${api.base1}?coordinates=${weather.coord.lat},${weather.coord.lon}`)
     .then(ap =>{
         return ap.json();
     }).then(displayResults_aq)
    } catch{
        alert('Enter More Precise Location');
    }

    console.log(weather);
    let lat = document.getElementById('lat-value');
    lat.innerText = `${weather.coord.lat}`;
    let lon = document.getElementById('lon-value');
    lon.innerText = `${weather.coord.lon}`;
    let temp = document.getElementById('temp');
    temp.innerText =`${weather.main.temp}`;
    let location = document.querySelector('.location .city')
    location.innerText = `${weather.name},${weather.sys.country}`
    let date = new Date();
    let datenow = document.querySelector('.location .date')
    datenow.innerText = dateBuilder(date);   

function dateBuilder(d)
{
    let months=[
        "January","February","March","April","May","June","July","August","September",
        "October","November","December",
    ];
    let days=[
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
}
