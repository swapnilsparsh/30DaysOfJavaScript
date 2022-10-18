import keyCodes from "./data/keycodes.js";

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
