const
  result = document.getElementById("result"),
  row1 = document.querySelector(".row1"),
  row2 = document.querySelector(".row2"),
  onElem = document.querySelectorAll("div.on"),
  statusElem=document.getElementById("status")
;

var colorMain = "";
var colorMainIdx = 0;

var visibleElemCount = 0;

var currMode = "easy";

function startGame(mode = currMode) {
  currMode = mode;
  randomizeColor();
  colorMainIdx = Math.floor(Math.random()* ((mode == "easy") ? 3 : 6));
  visibleElemCount = (mode == "easy") ? 3 : 6;
  onElem.forEach(elem => {
    elem.style.backgroundColor = `rgb(${Math.random()*254 + 1},${Math.random()*254 + 1},${Math.random()*254 + 1})`;
    if (elem.dataset.index == colorMainIdx)
      elem.style.backgroundColor = colorMain;
  })
  switch (mode) {
    case "easy": {
      row1.style.visibility = "visible";
      row2.style.visibility = "hidden";
      for (let i = 0; i < 3; i++) {
        onElem[i].style.visibility = "visible";
        onElem[i + 3].style.visibility = "hidden";
      }
      break;
    };
    case "hard": {
      row1.style.visibility = "visible";
      row2.style.visibility = "visible";
      for (let i = 0; i < 6; i++)
        onElem[i].style.visibility = "visible";
      break;
    }
  }
}

function randomizeColor() {
  let r = Math.floor(Math.random()*254 + 1);
  let g = Math.floor(Math.random()*254 + 1);
  let b = Math.floor(Math.random()*254 + 1);

  colorMain = `rgb(${r}, ${g}, ${b})`;
  
  statusElem.innerHTML = colorMain;
}

function checkMatch(backColor, elem) {
  if (visibleElemCount == 1) return;
  if (backColor.trim() === colorMain.trim()) {
    onElem.forEach(elem => {
      elem.style.backgroundColor = colorMain;
      result.innerHTML = `<p style="color:green">Correct!</p>`;
    });
  } else {
    result.innerHTML = "Try again";
    elem.style.visibility = "hidden";
  }
  if (--visibleElemCount == 1 && backColor.trim() !== colorMain.trim()) {
    result.innerHTML = `<p style="color:red">You Lost</p>`;
    return;
  }
}

document.querySelectorAll("button.hi").forEach(elem => {
  elem.addEventListener("click", (e) => {
    document.querySelector("button#play").style.display = "inline-block";
    startGame((e.target.innerText == "Easy") ? "easy" : "hard");
  })
})

onElem.forEach(elem => {
  elem.addEventListener("click", e => {
    checkMatch(e.target.style.backgroundColor, e.target);
  })
})