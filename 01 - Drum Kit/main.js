import keyCodes from "./data/keycodes.js";
import { createKeyElement } from "./utils/util.js";

const keys = document.getElementById("keys");

const audio = new Audio();

window.addEventListener("keydown", async function ({ key }) {
  const sound = keyCodes.find(
    (keyCode) => keyCode.key.toLowerCase() === key.toLowerCase()
  )?.sound;
  if (sound) {
    audio.src = `sounds/${sound}.wav`;
    await audio.play();
  }
});

keyCodes.forEach((keyCode) => {
  const key = createKeyElement(keyCode);
  keys.appendChild(key);
});
