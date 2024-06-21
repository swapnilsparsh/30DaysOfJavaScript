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
let current_page = 1;
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
    { name: "Drum Kit", url: "./01 - Drum Kit/index.html" },
    { name: "Clock", url: "./02 - Clock/index.html" },
    { name: "Random Color Generator", url: "./03 - Random Color Generator/index.html" },
    { name: "Digital Clock", url: "./04 - Digital Clock/index.html" },
    { name: "Random Password Generator", url: "./05 - Random Password Generator/index.html" },
    { name: "Calendar", url: "./06 - Calendar/index.html" },
    { name: "Dynamic Form Field", url: "./07 - Dynamic Form Field/index.html" },
    { name: "Number Counter", url: "./08 - Number Counter/index.html" },
    { name: "Dice Roll", url: "./09 - Dice Roll/index.html" },
    { name: "Emoji Switcher like Discord", url: "./10 - Emoji Switcher like Discord/index.html" },
    { name: "Color Picker", url: "./11 - Color Picker/index.html" },
    { name: "Custom QR Code", url: "./12 - Custom QR Code/index.html" },
    { name: "Favicon Fetcher", url: "./13 - Favicon Fetcher/index.html" },
    { name: "Visit Counter", url: "./14 - Visit Counter/index.html" },
    { name: "Joke Generator", url: "./15 - Joke Generator/index.html" },
    { name: "Countdown Timer", url: "./16 - Countdown Timer/index.html" },
    { name: "Text Speed Control", url: "./17 - Text Speed Control/index.html" },
    { name: "Stopwatch", url: "./18 - Stopwatch/index.html" },
    { name: "Traffic Lights", url: "./19 - Traffic Lights/index.html" },
    { name: "Levitate Board", url: "./20 - Levitate Board/index.html" },
    { name: "Wave Effect", url: "./21 - Wave Effect/index.html" },
    { name: "Zoom Effect", url: "./22 - Zoom Effect/index.html" },
    { name: "Drawing Pad", url: "./23 - Drawing Pad/index.html" },
    { name: "Word Counter", url: "./24 - Word Counter/index.html" },
    { name: "Weather App", url: "./25 - Weather App/index.html" },
    { name: "Calculator", url: "./26 - Calculator/index.html" },
    { name: "Memory Matching Game", url: "./27 - Memory Matching Game/index.html" },
    { name: "Music Player", url: "./28 - Music Player/index.html" },
    { name: "To-Do List", url: "./29 - To-Do List/index.html" },
    { name: "Tic Tac Toe", url: "./30 - Tic Tac Toe/index.html" },
    { name: "Pop the Balloons", url: "./31 - Pop the Balloons/index.html" },
    { name: "Key Code", url: "./32 - Key Code/index.html" },
    { name: "Decimal To Binary", url: "./33 - Decimal To Binary/index.html" },
    { name: "Hangman", url: "./34 - Hangman/index.html" },
    { name: "Simple Form Validation", url: "./35 - Simple Form Validation/index.html" },
    { name: "Lorem Ipsum Generator", url: "./36 - Lorem Ipsum Generator/index.html" },
    { name: "RPS (Rock, Paper, Scissors) Game", url: "./37 - RPS Game/index.html" },
    { name: "Snake Game", url: "./38 - Snake Game/index.html" },
    { name: "Age Calculator", url: "./39 - Age Calculator/index.html" },
    { name: "Gradient Generator", url: "./40 - Gradient Generator/index.html" },
    { name: "Sorting Visualizer", url: "./41 - Sorting Visualizer/index.html" },
    { name: "PixSort Studio", url: "./42 - PixSort Studio/index.html" },
    { name: "Getting Started with APIs", url: "./43 - Getting Started with APIs/index.html" },
    { name: "Block Runner", url: "./44 - Block Runner/index.html" },
    { name: "Dice Game", url: "./45 - Dice Game/index.html" },
    { name: "Palindrome Checker", url: "./46 - Palindrome Checker/index.html" },
    { name: "Caesar Cipher", url: "./47 - Caesar Cipher/index.html" },
    { name: "Weight Converter", url: "./48 - Weight Converter/index.html" },
    { name: "Image Utility", url: "./49 - Image Utility/index.html" },
    { name: "Guess the Number Game", url: "./50 - Guess the Number Game/index.html" },
    { name: "Balloon Game", url: "./51 - Balloon Game/index.html" },
    { name: "Temperature Converter", url: "./52 - Temperature Converter/index.html" },
    { name: "Notes Taking App", url: "./53 - Notes Taking App/index.html" },
    { name: "N Queen Visualizer", url: "./54 - N Queen Visualizer/index.html" },
    { name: "Bubble Shooting Game", url: "./55 - Bubble Shooting Game/index.html" },
    { name: "Stick Hero Game", url: "./56 - Stick Hero Game/index.html" },
    { name: "Quiz ADD", url: "./57 - Quiz ADD/index.html" },
    { name: "Simon Game", url: "./58 - Simon Game/index.html" },
    { name: "Color Choosing Game", url: "./59 - Color Choosing Game/index.html" },
    { name: "Reaction Time", url: "./60 - Reaction Time/index.html" },
    { name: "Wall Breaker Game", url: "./61 - Wall Breaker Game/index.html" },
    { name: "Dot Connect Game", url: "./62 - Dot Connect Game/index.html" },
    { name: "Insect Catching Game", url: "./63 - Insect Catching Game/index.html" },
    { name: "Particle Effect Animation", url: "./64 - Particle Effect Animation/index.html" },
    { name: "Postmaster Clone", url: "./65 - Postmaster Clone/index.html" },
    { name: "Text to Speech Converter", url: "./66 - Text to Speech Converter/index.html" },
    { name: "Currency Converter", url: "./67 - Currency Converter/index.html" },
    { name: "Movie/TV Series Quote Generator", url: "./68 - Movie/TV Series Quote Generator/index.html" },
    { name: "Pattern Generator", url: "./69 - Pattern Generator/index.html" },
    { name: "Transpose Matrix Calculator", url: "./70 - Transpose Matrix Calculator/index.html" },
    { name: "Steal Diamond Game", url: "./71 - Steal Diamond Game/index.html" },
    { name: "Typing Platform", url: "./72 - Typing Platform/index.html" },
    { name: "Casino Slot Machine Game", url: "./73 - Casino Slot Machine Game/index.html" },
      { name: "Color Game", url: "./74 - Color Game/index.html" },
      { name: "Movie Search App", url: "./75 - Movie Search App/index.html" },
      { name: "Car Game", url: "./76 - Car Game/index.html" },
      { name: "Search Github Profile", url: "./77 - Search Github Profile/index.html" },
      { name: "Dictionary App", url: "./78 - Dictionary App/index.html" },
      { name: "Three Number", url: "./79 - Three Number/index.html" },
      { name: "Sudoku", url: "./80 - Sudoku/index.html" },
      { name: "Hangman Game", url: "./81 - Hangman Game/index.html" },
      { name: "Falling Ball Game", url: "./82 - Falling Ball Game/index.html" },
      { name: "Dot Target Game", url: "./83 - Dot Target Game/index.html" },
      { name: "Tetris Game", url: "./84 - Tetris Game/index.html" },
      { name: "Sticky Notes", url: "./85 - Sticky Notes/index.html" },
      { name: "Spin The Wheel Game", url: "./86 - Spin The Wheel Game/index.html" },
      { name: "Body Mass Index Calculator", url: "./87 - Body Mass Index Calculator/index.html" },
      { name: "Ping Pong Game", url: "./88 - Ping Pong Game/index.html" },
      { name: "Projectile Motion Simulator", url: "./89 - Projectile Motion Simulator/index.html" },
      { name: "Atari Game", url: "./90 - Atari Game/index.html" },
      { name: "Multiply Math Game", url: "./91 - Multiply Math Game/index.html" },
      { name: "Casio", url: "./92 - Casio/index.html" },
      { name: "Typer", url: "./93 - Typer/index.html" },
      { name: "Word Guess", url: "./94 - Word Guess/index.html" },
      { name: "Whack a Mole Game", url: "./95 - Whack a Mole Game/index.html" },
      { name: "Pomodoro Clock", url: "./96 - Pomodoro Clock/index.html" },
      { name: "Captcha Generator", url: "./97 - Captcha Generator/index.html" },
      { name: "Math Game", url: "./98 - Math Game/index.html" },
      { name: "Blackjack Game", url: "./99 - Blackjack Game/index.html" },
      { name: "Coin Game", url: "./100 - Coin Game/index.html" },
      { name: "Bomb Throw Game", url: "./101 - Bomb Throw Game/index.html" },
      { name: "Minesweeper Game", url: "./102 - Minesweeper Game/index.html" },
      { name: "Retro Mario Game", url: "./103 - Retro Mario Game/index.html" },
      { name: "Catch Me If You Can", url: "./104 - Catch Me If You Can/index.html" },
      { name: "Word For Alphabet Speak Aloud", url: "./105 - Word For Alphabet Speak Aloud/index.html" },
      { name: "Snowy Particle Js", url: "./106 - Snowy Particle Js/index.html" },
      { name: "Stack Game", url: "./107 - Stack Game/index.html" },
      { name: "Maths addition", url: "./108 - Maths addition/index.html" },
      { name: "Number Facts", url: "./109 - Number Facts/index.html" },
      { name: "Pixel to em Converter", url: "./110 - Pixel to em Converter/index.html" },
      { name: "Luminosity Particle Js", url: "./111 - Luminosity Particle Js/index.html" },
      { name: "Maze Game", url: "./112 - Maze Game/index.html" },
      { name: "Minesweeper", url: "./113 - Minesweeper/index.html" },
      { name: "Guess the Country", url: "./115 - Guess The Country/index.html"},
      { name: "2048 Game", url: "./124 - 2048 Game/index.html"},
      { name: "Flappy Bird Game", url: "./125 - Flappy Bird/index.html"},
      { name: "Largest EigenValue and EigenVector Calculator", url: "./128 - Eigen Value and Vector Calculator/index.html"}
];

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(input.toLowerCase())
);

// Display suggestions
const suggestionList = document.getElementById("suggestion-list");
if (filteredSuggestions.length > 0) {
    suggestionList.innerHTML = '';
    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement('a');
      li.textContent = suggestion.name;
      li.setAttribute('href', suggestion.url);
      li.classList.add('game_page');
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
  }
}

function renderProjects() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const projectsPerPage = 30;
  const startIndex = (current_page - 1) * projectsPerPage;
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
  current_page = page;
  renderProjects();

  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (button.textContent == current_page) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function goToNextPage() {
  if (current_page < Math.ceil(x.length / 30)) {
    current_page++;
    renderProjects();
    updateActiveButton();
  }
}

function goToPreviousPage() {
  console.log(current_page)
  if (current_page > 1) {
    current_page--;
    renderProjects();
    updateActiveButton();
  }
}

function updateActiveButton() {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (parseInt(button.textContent) === current_page) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}
function togglePaginationButtonsVisibility() {
  const prevButton = document.querySelector('.prev_btn');
  const nextButton = document.querySelector('.next_btn');
  if (current_page === 1) {    
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'inline-block';
  }
  
  if (current_page === Math.ceil(x.length / 30)) {

    nextButton.style.display = 'none';
    console.log("end")
  } else {
    nextButton.style.display = 'inline-block';
  }
}

setInterval(togglePaginationButtonsVisibility, 300);
