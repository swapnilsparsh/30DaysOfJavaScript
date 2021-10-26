const jokeContainer = document.getElementById('jokeContainer');
const getJokeBtn = document.getElementById('getJokeBtn');

const API_URL = `https://api.icndb.com/jokes/random`;

getJoke();

async function getJoke() {
	const res = await fetch(API_URL);
	const data = await res.json();
	
	jokeContainer.innerHTML = data.value.joke;
}

getJokeBtn.addEventListener('click', getJoke);