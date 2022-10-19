export function createKeyElement(keyCode) {
  const div = document.createElement("div");
  const kbd = document.createElement("kbd");
  const span = document.createElement("span");

  div.classList.add("key");
  div.style.backgroundImage = `url(image/${keyCode.img})`;

  kbd.textContent = keyCode.key;
  kbd.addEventListener("click", () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: kbd.textContent }))
  );

  span.classList.add("sound");
  span.textContent = keyCode.sound;

  div.appendChild(kbd);
  div.appendChild(span);

  return div;
}
