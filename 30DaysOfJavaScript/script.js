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

function checkTheme() {
  console.log("Checking theme");
  const body = document.querySelector("body");
  const button = document.getElementById("toggle");

  const themeLocalStorage = localStorage.getItem("theme");
  console.log("Valor em themeLocalStorage:", themeLocalStorage);

  if (themeLocalStorage) {
    console.log(`diferente de null`);
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
  const body = document.querySelector("body");

  const button = document.getElementById("toggle");

  console.log(body.classList);
  if (body.classList.contains("dark-mode")) {
    body.className = "light-mode";
    button.innerHTML = "☀️";
    localStorage.setItem("theme", "light-mode");
  } else {
    body.className = "dark-mode";
    button.innerHTML = "🌙";
    localStorage.setItem("theme", "dark-mode");
  }
}

let currentPage = 1;

var x = document.getElementsByClassName("item");

function search_project() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  let projectsContainer = document.getElementById("projectsContainer");
  let projects = document.getElementsByClassName("item");
  let found = false;

  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i].querySelector("h4").innerHTML.toLowerCase();

    if (!projectName.includes(input)) {
      projects[i].style.display = "none";
    } else {
      projects[i].style.display = "list-item";
      found = true;
    }
  }

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
