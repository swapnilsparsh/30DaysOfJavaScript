const captcha = document.querySelector('.captcha'),
	reloadbtn = document.querySelector('.reload'),
	inputText = document.querySelector('.input-text input'),
	verifyBtn = document.querySelector('.verify'),
	responseTxt = document.querySelector('.result');

let characters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
];
function getCaptcha() {
	for (let i = 0; i < 6; i++) {
		let randomCharacter =
			characters[Math.floor(Math.random() * characters.length)];
		console.log(randomCharacter);
		captcha.innerText += ` ${randomCharacter}`;
		//passing 6 random characters
	}
}
getCaptcha();

reloadbtn.addEventListener('click', () => {
	removeInput();
	getCaptcha();
});

verifyBtn.addEventListener('click', (e) => {
	e.preventDefault();
	responseTxt.style.display = 'block';

	let inputVal = inputText.value.split('').join(' ');
	if (inputVal == captcha.innerText) {
		responseTxt.style.color = '#85C88A';
		responseTxt.innerText = "Nice! You don't appear to be a robot.";
		setTimeout(() => {
			removeInput();
			getCaptcha();
		}, 2000);
	} else {
		responseTxt.style.color = '#ff0000';
		responseTxt.innerText = 'Captcha not matched. Please try again!';
	}
});

function removeInput() {
	inputText.value = '';
	captcha.innerText = '';
	responseTxt.style.display = 'none';
}
