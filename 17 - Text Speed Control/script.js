const text = document.getElementById("text");
const speedEl = document.getElementById("speed");
const prog = "30 Days of JavaScript";
let idx = 1;
let speed = 300 / speedEl.value;

// initial call
writeText();

function writeText() {
    text.innerText = prog.slice(0, idx)
	
	idx++;
	
	if(idx > prog.length){
      idx = 1;
    }
	
	setTimeout(writeText, speed);
}

speedEl.addEventListener('input', (e) => {
	speed = 300 / e.target.value;
});