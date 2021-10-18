const container = document.getElementById('container');
const autoWavesButton = document.getElementById('toggleWaves');
const circlesArr = [];
let rows = 15;
let cols = 15;

let autoWaves = false;

// create circles
for(let i=0; i<cols; i++) {
	circlesArr[i] = [];
	for(let j=0; j<rows; j++) {
		const circle = document.createElement('div');
		circle.classList.add('circle');
		container.appendChild(circle);
		circlesArr[i].push(circle);	
	}
}

circlesArr.forEach((cols, i) => {
	cols.forEach((circle, j) => {
		circle.addEventListener('click', () => {
			growCircles(i, j);
		});
	});
});

function growCircles(i, j) {
	if(circlesArr[i] && circlesArr[i][j]) {
		if(!circlesArr[i][j].classList.contains('grow')) {
			circlesArr[i][j].classList.add('grow');
			setTimeout(() => {
				growCircles(i-1, j)
				growCircles(i+1, j)
				growCircles(i, j-1)
				growCircles(i, j+1)
			}, 100)
			
			setTimeout(() => {
				circlesArr[i][j].classList.remove('grow');
			}, 300);
		}
	}
}

function makeRandomWaves() {
	if (autoWaves) {
		const randomCoords = [Math.floor(Math.random() * cols),Math.floor(Math.random() * cols)];
		growCircles(randomCoords[0],randomCoords[1]);
	}
}

setInterval(makeRandomWaves,250);

autoWavesButton.addEventListener('click',()=>{
	autoWaves = !autoWaves;
	autoWavesButton.innerHTML = `Turn ${autoWaves ? 'off' : 'on'} Random Waves`;
});
