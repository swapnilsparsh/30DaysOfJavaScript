document.querySelector('body').addEventListener('mousemove', eyeBall);

function eyeBall() {
	let eye = document.querySelectorAll('.eye');
	
	eye.forEach( eye => {
		let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
		let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
		let radian = Math.atan2(event.pageX - x, event.pageY - y);
		let rot = (radian * (180 / Math.PI) * -1 ) + 270;
		eye.style.transform = `rotateZ(${rot}deg)`;
	});
}