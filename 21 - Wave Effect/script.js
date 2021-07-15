const container = document.getElementById('container');
const circlesArr = [];
let rows = 15;
let cols = 15;

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