let text = document.getElementById("Typewriter");
// text = document.querySelector("#Typewriter h2");

const textArray = text.textContent.split("");

console.log(textArray);

let timeLooper;

text.innerHTML = "";

console.log(text);

function typewriterEffect() {
  if (textArray.length > 0) {
    text.innerHTML += textArray.shift();
  } else {
    clearTimeout(timeLooper);
  }

  timeLooper = setTimeout(
    "typewriterEffect()",
    Math.floor(Math.random() * (200, 250))
  );
}
typewriterEffect();
