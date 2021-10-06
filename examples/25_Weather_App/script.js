// Openweathermap API
const api = 'a72fb8329b1206f627c9d890bf28d9df';

const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
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
  }
});
//