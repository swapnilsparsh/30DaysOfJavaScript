var box = document.getElementById("box");

var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;

window.addEventListener("resize", function(event) {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
});