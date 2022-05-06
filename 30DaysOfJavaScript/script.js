// Preloader
var preloader = document.getElementById('loading');
    
        function loading(){
           setTimeout( myfunction,2000);
       }      
       function myfunction(){
        preloader.style.display = 'none';
       }


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