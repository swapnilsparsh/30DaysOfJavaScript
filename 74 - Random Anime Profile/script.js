const getBTN = document.getElementById("btn");
const animeBox = document.querySelector(".anime-box");
const anime = document.querySelector(".anime");
const animeName = document.querySelector(".hero-name");
const animeLoader = document.querySelector(".anime-loader");

const api_url = `https://api.catboys.com/img`;

getBTN.addEventListener("click", async function () {
  animeLoader.style.display = "block";
  const response = await fetch(api_url);
  const data = await response.json();
  anime.src = data.url;
  animeBox.style.display = "block";
  animeName.textContent = data.artist;
  saveBTN.style.display = "inline-block";
  animeLoader.style.display = "none";
});

const saveBTN = document.getElementById("save");
saveBTN.addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = anime.src;
  link.download = "anime.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
