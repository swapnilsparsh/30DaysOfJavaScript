// Preloader
var preloader = document.getElementById('loading');

function loading() {
  setTimeout(myfunction, 2000);
}
function myfunction() {
  preloader.style.display = 'none';
}


$(document).ready(function () {
  renderProjects()
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

function toggleDarkLight() {
  var body = document.getElementById("body");
  var button = document.getElementById("toggle");
  if (button.innerHTML == "🌙") {
    button.innerHTML = "☀️";
  } else {
    button.innerHTML = "🌙";
  }

  var trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 500);
  };

  var currentClass = body.className;
  // body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  if (currentClass == "dark-mode") {
    trans();
    body.className = "light-mode";
  } else {
    trans();
    body.className = "dark-mode";
  }
}

let currentPage = 1;

var x = document.getElementsByClassName('item');

function search_project() {
  let input = document.getElementById('searchbar').value.toLowerCase();
  
  for (let i = 0; i < x.length; i++) {
    const projectName = x[i].querySelector("h4").innerHTML.toLowerCase();

    if (!projectName.includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}

function renderProjects() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
