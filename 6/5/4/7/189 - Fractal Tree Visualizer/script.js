//GLOBAL VARIABLES
var context, canvas;
const len = 150;

//CREATES THE BUTTON

//CREATES THE SLIDER
var slider = document.createElement('INPUT');

//SETS RANGE ATTRIBUTES
slider.setAttribute('type','range');
//Change this attributes to expand the range of angles
slider.setAttribute('min','1');
slider.setAttribute('max','36');
slider.setAttribute('step','0.5');
slider.defaultValue = 4;

//APPENDS TO BODY
document.body.appendChild(slider);

function line(x,y,xf,yf,color) {
  context.beginPath();
  context.strokeStyle = color || "#fff";
  context.moveTo(x,y);
  context.lineTo(xf,yf);
  context.stroke();
  context.closePath();
}

function createCanvas(w,h,color) {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  
  
  canvas.width = w || window.innerWidth;
  canvas.height = h || window.innerHeight;
  canvas.style.backgroundColor = color || "#333";
  
}

function branch(len) {
  var root = false;
  angle = Math.PI /  Math.round(slider.value);
  line(0,0,0,-len,"#0f0");
  context.translate(0,-len);
  if(len > 3) {
    context.save();
    context.rotate(angle);
    branch(len * 2/3);
    context.restore();
    context.save();
    context.rotate(-angle);
    branch(len * 2/3);
    context.restore();
  }
  context.translate(0,len);
}

function setup() {
  createCanvas(false, false, "#000");
  context.translate(canvas.width/2, canvas.height);
}

function draw() {
  context.save();
  context.setTransform(1,0,0,1,0,0);
  context.clearRect(0,0,canvas.width,canvas.height);
    context.restore();
    branch(len);
  requestAnimationFrame(draw);
}

window.onload = function() {
  setup();
  requestAnimationFrame(draw);
}