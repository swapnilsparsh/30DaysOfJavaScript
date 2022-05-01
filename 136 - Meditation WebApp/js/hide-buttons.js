const app = document.querySelector(".app");

// AMOUNT OF TIME TO CONSIDER USER INACTIVE
const inactiveTime = 3000; // 3sec

// LAST TIME THE MOUSE HAS MOVED
let mouseLastMoveTime = new Date();

// LISTEN FOR MOUSE MOVE
document.addEventListener("mousemove", () => {
  // RESET LAST TIME THE MOUSE HAS MOVED
  mouseLastMoveTime = new Date();

  // SHOW APP
  app.classList.remove("inactive");

  // SHOW CURSOR
  document.body.style.cursor = "auto";
});

// DEACTIVATE APP
function deactivateApp() {
  // Check if the user was inactive for a certain amount of time
  let now = new Date();
  let deltaTime = now - mouseLastMoveTime;

  if (deltaTime >= inactiveTime) {
    // HIDE APP
    app.classList.add("inactive");

    // HIDE CURSOR
    document.body.style.cursor = "none";
  }

  // LOOP
  requestAnimationFrame(deactivateApp);
}
deactivateApp();
