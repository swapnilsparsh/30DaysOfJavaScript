const getBTN = document.getElementById("btn");
const animeBox = document.querySelector(".anime-box");
const anime = document.querySelector(".anime");
const animeName = document.querySelector(".hero-name");
const animeLoader = document.querySelector(".anime-loader");
const saveBTN = document.getElementById("save");

const api_url = `https://api.catboys.com/img`;

getBTN.addEventListener("click", async function () {
  animeLoader.style.display = "block";
  try{
  const response = await fetch(api_url);
  const data = await response.json();
  anime.src = data.url;
  animeName.textContent = data.artist;
  saveBTN.style.display = "inline-block";
  animeBox.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 500));
  animeLoader.style.display = "none";
  } 
  catch (error) {
    console.log(error);
    animeLoader.style.display = "none";
  }
});


saveBTN.addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = anime.src;
  link.download = "anime.jpg";
  document.body.appendChild(link);
  const confirmed = confirm("Do you want to download this image?");
  if (confirmed) {
    link.click();
  }
  link.click();
  document.body.removeChild(link);
  // confirm("Do you want to download this image?");
});
