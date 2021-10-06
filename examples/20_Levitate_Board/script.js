const container = document.getElementById('container');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71','#f2e335', '#ef4a92']
const SQUARES_NR = 300;

for(let i=0; i<SQUARES_NR; i++) {
	const square = document.createElement('div');
	square.classList.add('square');
	
	square.addEventListener('mouseover', () => {
		setColorToEl(square);
	});
	
	square.addEventListener('mouseout', () => {
		removeColorFromEl(square);
	});

    square.addEventListener('click', () => {
		setColorToEl(square);
	});
	
	container.appendChild(square);
}

function setColorToEl(element) {
	const color = getRandomColor();
	element.style.background = color;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColorFromEl(element) {
	element.style.background = '#19172e';
	element.style.boxShadow = `0 0 2px #ffffff`;
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}