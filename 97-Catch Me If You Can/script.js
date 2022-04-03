var box = document.getElementById("box");

var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;

// Updates the viewport height and width dynamically
window.addEventListener("resize", function(event) {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
});

box.addEventListener("mouseover", function(event) {
    var boxAttr = box.getBoundingClientRect();

    var pos = getNewPosition(boxAttr.width, boxAttr.height);

    box.style.top = pos.y + "px";
    box.style.left = pos.x + "px";

});