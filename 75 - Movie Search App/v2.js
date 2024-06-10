const API_KEY = "apikey=5a58dd7";
const BASE_URL = "//www.omdbapi.com";

const logo = document.querySelector("#logo");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

const editorsPickMoviesHeading = document.querySelector("#editors-pick-movies-heading");
const editorsPick = document.querySelector("main #editors-pick");
const scrollUp = document.querySelector("#scroll-up");
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');

// http://www.omdbapi.com/?apikey=5a58dd7&s=movie
// https://serpapi.com/search.json?engine=google_play_movies&api_key=bfe513fd4efb37e99b1d2e10fe6d9119322194c9de0dc862dbd0659d160796fd

// Skeleton Loading movieCard template rendering using JavaScript
function elementFromHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

// Skeleton Loading movieCard template
const movieCard = elementFromHtml(`
  <div class="movie-card">
    <div class="loader"></div>
    <div class="movie-info">
      <div style="flex-basis:100%">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
      <div class="rating"><i class="fa-solid fa-star"></i> 0.0</div>
    </div>

    <div class="overview">
      <h3>Overview</h3>
      <div>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
      </div>
      <br>
      <div>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
        <p class="skeleton skeleton-text"></p>
      </div>
    </div>
  </div>
`);


// Function that fetches the movies from the API
const getMovies = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            showMovies(editorsPick, data.Search);
            editorsPickMoviesHeading.innerHTML = `${data.Search.length} results for "<p id="display-search-term">${search.value}</p>"`;
        } else {
            editorsPick.innerHTML = `<img src="images/nothing-to-show.avif" alt="Nothing To Show" />`;
            editorsPickMoviesHeading.innerHTML = "No results found.";
        }
    } catch (error) {
        console.log("Error fetching the data:", error);
        popup.style.display = 'block';
    }
};


// Function that displays the movieCard on the screen
const showMovies = (sectionName, data) => {
    sectionName.innerHTML = "";
    if (!data) return;

    data.forEach((movie) => {
        const { Title, Poster, imdbID, Year, Plot, imdbRating } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie-card");
        movieEl.innerHTML = `
        <div class="img-container">
            <img src="${Poster !== 'N/A' ? Poster : 'images/no-image-available.png'}" alt="${Title}" loading="lazy">
        </div>
        <div class="movie-info">
            <h4 style="flex-basis:100%">${Title}</h4>
            <div class="rating">Year: ${Year}</div>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p><a href="https://www.imdb.com/title/${imdbID}" target="_blank">IMDB Page <i class="fa-solid fa-arrow-up-right-from-square" style="color: gray;"></i></a></p>
        </div>
    `;
        sectionName.appendChild(movieEl);
    });
};

// Event Listeners for the search button
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    editorsPickMoviesHeading.innerHTML = "";
    editorsPick.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const movieCardClone = movieCard.cloneNode(true);
        editorsPick.appendChild(movieCardClone);
    }
    const searchTerm = search.value.trim();
    const searchURL = `${BASE_URL}/?${API_KEY}&s=${searchTerm}`;
    getMovies(searchURL);
});

// Event Listener for the close button on the popup
closePopup.addEventListener('click', () => popup.style.display = 'none');

// Event Listener for the logo
logo.addEventListener("click", () => {
    search.value = "";
    editorsPickMoviesHeading.innerHTML = `Search For Your Favorite Movies <i class="fa-solid fa-wand-magic-sparkles"></i>`;
    editorsPick.innerHTML = `<img src="./images/search.png" alt="Search For Your Favorite Movies" width="300" height="300">`;
});

// Event Listener for the scroll-up button
window.addEventListener('scroll', () => scrollUp.style.display = window.scrollY > 500 ? "block" : "none");

scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
