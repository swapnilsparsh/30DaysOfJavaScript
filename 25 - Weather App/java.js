const apikey = "f8bfa588b39ef086d5fa9b394fd86d09";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";;
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weathericon.src = "/images for weather app/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "/images for weather app/rain.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "/images for weather app/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "/images for weather app/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "/images for weather app/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
