const ipAddress = document.getElementById("dyn-ip");
const ipLocation = document.getElementById("dyn-loc");
const timezone = document.getElementById("dyn-tzone");
const isp = document.getElementById("dyn-isp");
const input = document.getElementById("input-value");

var mymap = L.map("map");

let lat;
let lng;

const fetchData = (val = "") => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_WErCCnwkXvtb9z6TpOjrLTReYowLi&ipAddress=${val}`
  )
    .then((res) => res.json())
    .then((data) => {
      lat = data.location.lat;
      lng = data.location.lng;
      displayData(data);
      newLoc();
      // input.innerText = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = fetchData();

const displayData = (data) => {
  ipAddress.innerText = data.ip;
  ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezone.innerText = `UTC ${data.location.timezone}`;
  isp.innerText = data.isp;
};

const newLoc = () => {
  mymap.setView([lat, lng], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidnJpbmRhLXR5YWdpMDkiLCJhIjoiY2t2cTg5eW5tMXdjczJ1bzV6cHF0NzNmcCJ9.mR1IsOMZHMNcWq39Iv1W_g",
    {
      maxZoom: 18,
      attribution: false,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
  L.marker([lat, lng]).addTo(mymap);
};
