const getBtn = document.querySelector(".btn");
const animebox = document.querySelector(".anime-box");
const animeImg = document.querySelector(".anime");
const animeName = document.querySelector(".hero-name");

const api_url = `https://api.catboys.com/img`;

getBtn.addEventListener("click", async function () {
  const response = await fetch(api_url);
  const data = await response.json();
  animeImg.src = data.url;
  animebox.style.display = "block";
  animeName.textContent = data.artist;
});
