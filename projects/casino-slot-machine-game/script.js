let value1 = document.getElementById("value1");
let value2 = document.getElementById("value2");
let value3 = document.getElementById("value3");

let inpSpeed = document.getElementById("inpSpeed");
let btnStart = document.getElementById("btnStart"); //
let btnStop = document.getElementById("btnStop"); //

let myoutput = document.getElementById("myoutput"); //
let values = ["😂", "🤩", "🤑", "🥶", "😭", "😍", "😎"];

window.onload = initial();

function initial() {
  value1.classList.remove("value");
  value2.classList.remove("value");
  value3.classList.remove("value");

  btnStart.style.display="block";
  btnStop.style.display="none";
}

function getRandomValue() {
  return values[Math.floor(Math.random() * 7)];
}
// setInterval(()=>{

//     value1.innerText= getRandomValue()
//     value2.innerText= getRandomValue()
//     value3.innerText= getRandomValue()
// },300)

let animationId;
function updateAnimation(newSpeed) {
  if (animationId) clearInterval(animationId);
  animationId = setInterval(() => {
    value1.innerText = getRandomValue();
    value2.innerText = getRandomValue();
    value3.innerText = getRandomValue();
  }, 1000 / newSpeed);
}
inpSpeed.onchange = function (ev) {
  //document.documentElement= root of CSS
  document.documentElement.style.setProperty("--speed", ev.target.value);
  updateAnimation(ev.target.value);
};  


// classList 'value' represent animation
function stopclick() {
  clearInterval(animationId);

  console.log("stop button clicked");
  if (
    value1.innerText == value2.innerText &&
    value2.innerText == value3.innerText
  ) {
    text = " Well Done Boss , You Won! 😎😎😎";
  } else {
    text = " OOPS!😐 Give it another try ";
  }
  initial();

  myoutput.textContent = text;
}

function startclick() {
  
  updateAnimation(inpSpeed.value);
  value1.classList.add("value");
  value2.classList.add("value");
  value3.classList.add("value");

  myoutput.textContent = "Hey! You are ON 😎🔥";
  
  // btnStart.disabled = true
  btnStart.style.display="none";
  btnStop.style.display="block";
  inpSpeed.disabled = true
}

//
