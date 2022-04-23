var mytext = document.getElementById("mytext");
var mydiv = document.getElementById("mydiv");
var mybutton = document.getElementById("mybutton");
var i = 0;
mybutton.onclick = function () {
    var typewriter = setInterval(function () {
    mydiv.textContent += mytext.textContent[i];
    i++;
    if (i > mytext.textContent.length - 1) {
    	mytext.textContent="Done !!!!!";
    	i=0;
      	clearInterval(typewriter);
    }
  }, 100);
};
