const countEl = document.getElementById('count');

updateVisitCount();

function updateVisitCount() {
	fetch('https://api.countapi.xyz/hit/swapnilsparsh/?amount=1')
	.then(res => res.json())
	.then(res => {
		countEl.innerHTML = res.value;
		animateValue(countEl, 0,res.value, 1000);
	}
	
	)
}

function animateValue(obj, start, end, duration) {
	let startTimestamp = null;
	const step = (timestamp) => {
	  if (!startTimestamp) startTimestamp = timestamp;
	  const progress = Math.min((timestamp - startTimestamp) / duration, 1);
	  obj.innerHTML = Math.floor(progress * (end - start) + start);
	  if (progress < 1) {
		window.requestAnimationFrame(step);
	  }
	};
	window.requestAnimationFrame(step);
  }