const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=editorsPickity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

const logo = document.querySelector("#logo");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

const popularMoviesHeading = document.querySelector("#popular-movies-heading");
const popularMoviesSection = document.querySelector("#popular-movies-section");
const editorsPickMoviesHeading = document.querySelector("#editors-pick-movies-heading");
const recommendedMoviesHeading = document.querySelector("#recommended-movies-heading");

const popular = document.querySelector("main #popular");
const editorsPick = document.querySelector("main #editors-pick");
const recommendations = document.querySelector("main #recommendations");
const scrollUp = document.querySelector("#scroll-up");
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');

// Main URL sample: https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=avengers
// Recommendation URL sample: https://api.themoviedb.org/3/movie/299534/recommendations?api_key=1cf50e6248dc270629e802686245c2c8&language=en-US&page=1



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
        </br>
        <div>
          <p class="skeleton skeleton-text"></p>
          <p class="skeleton skeleton-text"></p>
          <p class="skeleton skeleton-text"></p>
        </div>
      </div>
  </div>
`);

//Skeleton loading for the popular section
for (let i = 0; i < 9; i++) {
  const movieCardClone = movieCard.cloneNode(true);
  popular.appendChild(movieCardClone);
}

//Skeleton loading for the editorsPick section
for (let i = 0; i < 20; i++) {
  const movieCardClone = movieCard.cloneNode(true);
  editorsPick.appendChild(movieCardClone);
}

//Skeleton loading for the recommendations section
for (let i = 0; i < 20; i++) {
  const movieCardClone = movieCard.cloneNode(true);
  recommendations.appendChild(movieCardClone);
}



//Function that extracts the movies that are rated higher than 7.5 and sorts them by popularity
const popularMovies = (data) => {
  const filteredData = data.filter(movie => movie.vote_average >= 7.5).sort((a, b) => b.popularity - a.popularity);
  showMovies(popular, filteredData);
};



//Function that fetches the movies from the API
const getMovies = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    showMovies(editorsPick, data.results);
    popularMovies(data.results);
    console.log(data.results);

    if (data.results.length > 0) getRecommendationsForMovie(data.results[0].id);
    if (data.results.length < 1) {
      editorsPick.innerHTML = "";
      editorsPick.innerHTML = `<img src="images/nothing-to-show.avif" alt="Nothing To Show" />`;
    }
    return data.results;
  }
  catch (error) {
    console.log("Error fetching the data:", error);
    popup.style.display = 'block';
    return 0;
  }
};



//Function that fetches the Recommended movies from the API
const getRecommendationsForMovie = async (movieId) => {
  const recommendationsURL = `${BASE_URL}/movie/${movieId}/recommendations?${API_KEY}&language=en-US&page=1`;
  try {
    const response = await fetch(recommendationsURL);
    const data = await response.json();

    showMovies(recommendations, data.results);

    if (data.results.length < 1) {
      recommendations.innerHTML = "";
      recommendedMoviesHeading.innerHTML = `No Recommendations <i class="fa-solid fa-gifts"></i>`;
      recommendations.innerHTML = `<img src="images/nothing-to-show.avif" alt="Nothing To Show" />`;
    }
    else {
      recommendedMoviesHeading.innerHTML = `Recommended <i class="fa-solid fa-gifts"></i>`;
    }
    return data.results;
  }
  catch (error) {
    console.log("Error fetching the recommendations:", error);
    popup.style.display = 'block';
    return 0;
  }
};



//Function that displays the movieCard on the screen, "sectionName" is the section where the movieCard will be displayed & "data" is the movie data fetched from the API
const showMovies = (sectionName, data) => {
  sectionName.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `
        <div class="img-container">
            <img src="${poster_path ? IMG_URL + poster_path : 'images/no-image-available.png'}" alt="${title}" loading="lazy">
        </div>
        <div class="movie-info">
            <h4 style="flex-basis:100%">${title}</h4>
            <div class="rating ${getColor(vote_average)}"><i class="fa-solid fa-star"></i> ${Math.round(vote_average * 10) / 10}</div>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
    `;

    sectionName.appendChild(movieEl);
  });
}



//Function that returns the color of the rating based on the value
const getColor = (vote) => vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";



//Event Listeners for the search button
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  const url = searchTerm ? `${searchURL}&query=${searchTerm}` : API_URL;
  const getMoviesObj = await getMovies(url);
  const noOfResults = getMoviesObj.length;
  console.log(noOfResults);
  if (url !== API_URL && noOfResults >= 0) {
    popularMoviesHeading.style.display = "none";
    popularMoviesSection.style.display = "none";
    editorsPickMoviesHeading.innerHTML = `${noOfResults} results for "<p id="display-search-term">${searchTerm}</p>"`;
  }
  else {
    popularMoviesHeading.style.display = "block";
    popularMoviesSection.style.display = "block";
    editorsPickMoviesHeading.innerHTML = "Editor's Pick";
  }
});


//Event Listeners for the scroll-up button. It will appear when the user scrolls down the page and disappear when the user scrolls up. When clicked, it will scroll to the top of the page.
window.addEventListener('scroll', () => scrollUp.style.display = window.scrollY > 500 ? "block" : "none");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


//Event Listener for the close button on the popup. When clicked, it will close the popup.
closePopup.addEventListener('click', () => popup.style.display = 'none');


getMovies(API_URL); //Initial call to the getMovies function to fetch the movies from the API


//Event Listener for the logo. When clicked, it will clear the search input and take the user back to the initial state of the page.
logo.addEventListener("click", () => {
  search.value = "";
  popularMoviesHeading.style.display = "block";
  popularMoviesSection.style.display = "block";
  editorsPickMoviesHeading.innerHTML = "Editor's Pick";
  getMovies(API_URL);
});