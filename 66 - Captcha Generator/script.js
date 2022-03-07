let check = document.getElementById("check-button");
let userInput = document.getElementById("user-input");
let textOutput = document.getElementById("text");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-btn");
let text = "";

const textGenerator = () => {
  let generatedText = "";
  for (let i = 0; i < 3; i++) {
    generatedText += String.fromCharCode(randomNumber(65, 90));
    generatedText += String.fromCharCode(randomNumber(97, 122));
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
};

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function drawStringCanvas(string) {
  let cx = canvas.getContext("2d");
  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
  const textColor = ["rgb(0,0,0)", "rgb(130,130,130)"];
  const letterSpace = 150 / string.length;
  for (let i = 0; i < string.length; i++) {
    const xintialSpace = 25;
    cx.font = "20px Roboto Mono";
    cx.fillStyle = textColor[randomNumber(0, 1)];
    cx.fillText(
      string[i],
      xintialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}

const triggerfunction = () => {
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringCanvas(text);
};

reloadButton.addEventListener("click", triggerfunction);

window.onload = () => triggerfunction();

check.addEventListener("click", () => {
  if (userInput.value === text) {
    alert("Validation Success");
    triggerfunction();
  } else {
    alert("Captcha Not Valid");
    triggerfunction();
  }
});
