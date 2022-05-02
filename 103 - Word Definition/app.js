const container = document.querySelector(".container"),
  searchInput = container.querySelector("input"),
  sound = document.getElementById("sound");
(infoText = container.querySelector(".info-text")),
  (removeIcon = container.querySelector(".search span"));
let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Oops ;) we can't find <span>"${word}"</span>.`;
  } else {
    container.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phontetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    audio = new Audio(result[0].phonetics[0].audio);
  }
}

function playSound() {
  audio.play();
}

function search(word) {
  fetchApi(word);
  searchInput.value = word;
}

function fetchApi(word) {
  container.classList.remove("active");
  infoText.innerHTML = `Searching :) `;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => data(result, word))
    .catch(() => {
      infoText.innerHTML = `Oops ;) we can't find <span>"${word}"</span>.`;
    });
}

searchInput.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    fetchApi(word);
  }
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  container.classList.remove("active");
  infoText.style.color = "#9A9A9A";
});
