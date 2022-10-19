import keyCodes from "./data/keycodes.js";

const kbds = document.querySelectorAll("kbd");

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

kbds.forEach((kbd) => {
  const event = new KeyboardEvent("keydown", { key: kbd.textContent });
  kbd.addEventListener("click", () => window.dispatchEvent(event));
});
