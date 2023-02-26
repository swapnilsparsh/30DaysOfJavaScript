const insert = document.getElementById("insert");

window.addEventListener("keydown", (event) => {
  insert.innerHTML = `
  <div class="key">
    ${event.key === " " ? "Space" : event.key} 
    <small>event.key</h3>
  </div>
  <div class="key">
    ${event.keyCode}
    <small>event.keyCode</small>
  </div>
  <div class="key">
    ${event.code}
    <small>event.code</small>
  </div>
  `;
});
