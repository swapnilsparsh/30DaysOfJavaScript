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
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
