// Preloader
var preloader = document.getElementById("loading");

function loading() {
  setTimeout(myfunction, 2000);
}
function myfunction() {
  preloader.style.display = "none";
}

$(document).ready(function () {
  renderProjects();
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 100) {
      $(".scrollToTop").fadeIn();
    } else {
      $(".scrollToTop").fadeOut();
    }
  });
  $(".scrollToTop").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});
let currentPage = 1;
function checkTheme() {
  const body = document.querySelector("body");
  const button = document.getElementById("toggle");

  const themeLocalStorage = localStorage.getItem("theme");

  if (themeLocalStorage) {
    body.className = themeLocalStorage;
  }

  if (themeLocalStorage == "light-mode") {
    button.innerHTML = "☀️";
  } else {
    button.innerHTML = "🌙";
  }
}
document.addEventListener("DOMContentLoaded", checkTheme);

function toggleDarkLight() {
  
  let input = document.getElementById("suggestion-list")
  const body = document.querySelector("body");

  const button = document.getElementById("toggle");

  if (body.classList.contains("dark-mode")) {
    body.className = "light-mode";
    input.style.color = 'white';
    button.innerHTML = "☀️";
    localStorage.setItem("theme", "light-mode");

  } else {
    body.className = "dark-mode";
    button.innerHTML = "🌙";
    localStorage.setItem("theme", "dark-mode");
  }
}





var x = document.getElementsByClassName("item");
function search_project() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  let projectsContainer = document.getElementById("projectsContainer");
  let projects = document.getElementsByClassName("item");
  let found = false;

  // Array of project suggestions
  const suggestions = [
    "Drum Kit",
    "Clock",
    "Random Color Generator",
    "Digital Clock",
    "Random Password Generator",
    "Calendar",
    "Dynamic Form Field",
    "Number Counter",
    "Dice Roll",
    "Emoji Switcher like Discord",
    "Color Picker",
    "Custom QR Code",
    "Favicon Fetcher",
    "Visit Counter",
    "Joke Generator",
    "Countdown Timer",
    "Text Speed Control",
    "Stopwatch",
    "Traffic Lights",
    "Levitate Board",
    "Wave Effect",
    "Zoom Effect",
    "Drawing Pad",
    "Word Counter",
    "Weather App",
    "Calculator",
    "Memory Matching Game",
    "Music Player",
    "To-Do List",
    "Tic Tac Toe",
    "Pop the Balloons",
    "Key Code",
    "Decimal To Binary",
    "Hangman",
    "Simple Form Validation",
    "Lorem Ipsum Generator",
    "RPS (Rock, Paper, Scissors) Game",
    "Snake Game",
    "Age Calculator",
    "Gradient Generator",
    "Sorting Visualizer",
    "PixSort Studio",
    "Getting Started with APIs",
    "Block Runner",
    "Dice Game",
    "Palindrome Checker",
    "Caesar Cipher",
    "Weight Converter",
    "Image Utility",
    "Guess the Number Game",
    "Balloon Game",
    "Temperature Converter",
    "Notes Taking App",
    "N Queen Visualizer",
    "Bubble Shooting Game",
    "Stick Hero Game",
    "Quiz ADD",
    "Simon Game",
    "Color Choosing Game",
    "Reaction Time",
    "Wall Breaker Game",
    "Dot Connect Game",
    "Insect Catching Game",
    "Particle Effect Animation",
    "Postmaster Clone",
    "Text to Speech Converter",
    "Currency Converter",
    "Movie/TV Series Quote Generator",
    "Pattern Generator",
    "Transpose Matrix Calculator",
    "Steal Diamond Game",
    "Typing Platform",
    "Casino Slot Machine Game",
    "Color Game",
    "Movie Search App",
    "Car Game",
    "Search Github Profile",
    "Dictionary App",
    "Three Number",
    "Sudoku",
    "Hangman Game",
    "Falling Ball Game",
    "Dot Target Game",
    "Tetris Game",
    "Sticky Notes",
    "Spin The Wheel Game",
    "Body Mass Index Calculator",
    "Ping Pong Game",
    "Projectile Motion Simulator",
    "Atari Game",
    "Multiply Math Game",
    "Casio",
    "Typer",
    "Word Guess",
    "Whack a Mole Game",
    "Pomodoro Clock",
    "Captcha Generator",
    "Math Game",
    "Blackjack Game",
    "Coin Game",
    "Bomb Throw Game",
    "Minesweeper Game",
    "Retro Mario Game",
    "Catch Me If You Can",
    "Word For Alphabet Speak Aloud",
    "Snowy Particle Js",
    "Stack Game",
    "Maths addition",
    "Number Facts",
    "Pixel to em Converter",
    "Luminosity Particle Js",
    "Maze Game",
    "Minesweeper"
  ]

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(input)
  );

  // Display suggestions
  const suggestionList = document.getElementById("suggestion-list");
  if (filteredSuggestions.length > 0) {
    suggestionList.innerHTML = '';
    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      li.addEventListener('click', function() {
        document.getElementById("searchbar").value = suggestion;
        suggestionList.style.display = 'none';
      });
      suggestionList.appendChild(li);
    });
    suggestionList.style.display = 'block';
  } else {
    suggestionList.style.display = 'none';
  }

  // Iterate through projects to filter and display
  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i].querySelector("h4").innerHTML.toLowerCase();

    if (!projectName.includes(input)) {
      projects[i].style.display = "none";
    } else {
      projects[i].style.display = "list-item";
      found = true;
    }
  }

  // Display message if no projects found
  let existingMessage = document.getElementById("noProjectMessage");
  if (existingMessage) {
    existingMessage.remove();
  }

  if (!found) {
    let noProjectMessage = document.createElement("h1");
    noProjectMessage.id = "noProjectMessage";
    noProjectMessage.innerHTML = "No project found";
    projectsContainer.appendChild(noProjectMessage);
  }
  
  if(input.length<=1){
    suggestionList.style.display="none"
    console.log("start")
  }
}

function renderProjects() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const projectsPerPage = 30;
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  for (let i = 0; i < x.length; i++) {
    if (i >= startIndex && i < endIndex) {
      x[i].style.display = "list-item";
    } else {
      x[i].style.display = "none";
    }
  }
}

function goToPage(page) {
  currentPage = page;
  renderProjects();

  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (button.textContent == currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function goToNextPage() {
  if (currentPage < Math.ceil(x.length / 30)) {
    currentPage++;
    renderProjects();
    updateActiveButton();
  }
}

function goToPreviousPage() {
  console.log(currentPage)
  if (currentPage > 1) {
    currentPage--;
    renderProjects();
    updateActiveButton();
  }
}

function updateActiveButton() {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}
function togglePaginationButtonsVisibility() {
  const prevButton = document.querySelector('.prev_btn');
  const nextButton = document.querySelector('.next_btn');
  if (currentPage === 1) {    
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'inline-block';
  }
  
  if (currentPage === Math.ceil(x.length / 30)) {

    nextButton.style.display = 'none';
    console.log("end")
  } else {
    nextButton.style.display = 'inline-block';
  }
}

setInterval(togglePaginationButtonsVisibility, 300);
