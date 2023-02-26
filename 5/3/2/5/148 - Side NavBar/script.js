$(document).ready(function () {
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

function search_project() {
  let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();
  var x = document.getElementsByClassName('item');

  for (i = 0; i < x.length; i++) {
    if (!x[i].querySelector('a').innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    }
    else {
      x[i].style.display = "list-item";
    }
  }
}  


// SideNavBAr

function openSideNav() {
  document.getElementById("30daysSidenavbar").style.width = "250px";
  document.getElementById("toggle").style.margin = "55px 3px 3px 260px";
  document.getElementById("mainContainer").style.margin = "10px 0px 0px 260px";
  document.querySelector(".main").style.gridTemplateColumns= ["repeat(auto-fill, 290px)"];
  document.querySelector(".main").style.width= "90vw";
 
}

function closeSideNav() {
  document.getElementById("30daysSidenavbar").style.width = "0";
  document.getElementById("toggle").style.margin= "55px 3px 3px 120px";
  document.getElementById("mainContainer").style.margin= "auto";
  document.querySelector(".main").style.gridTemplateColumns= ["repeat(auto-fit, minmax(320px, 1fr))"];
  document.querySelector(".main").style.width= "80vw";
}