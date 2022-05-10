const banner = document.querySelector('.banner');

window.addEventListener('scroll', function() {
	const value = 1000 - window.scrollY;
	banner.style.clipPath = `circle(${value}px at center center)`;
});