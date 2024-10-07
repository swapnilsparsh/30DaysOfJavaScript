//DOM Elements
const color1Elem = document.getElementById('color-1');
const color2Elem = document.getElementById('color-2');
const codeElem = document.querySelector('.code');
const btn = document.querySelector('.btn');
const infoElem = document.querySelector('.info');

//Generate HEX
function getHEX(){
    let randomHex = Math.random().toString(16).substr(-6);
    let hexColor = `#${randomHex}`;
    return hexColor;
}

//Update the UI
function updateUI(){
    infoElem.remove();

    color1Elem.innerText = getHEX();
    color2Elem.innerText = getHEX();

    color1Elem.style.background = color1Elem.innerText;
    color2Elem.style.background = color2Elem.innerText;

    codeElem.innerText = `background: linear-gradient(90deg, ${color1Elem.innerText}, ${color2Elem.innerText});`;
    document.body.style.background = `linear-gradient(90deg, ${color1Elem.innerText}, ${color2Elem.innerText})`;
}

//when user clicks SPACE or the arrow, then UpdateUI

window.addEventListener('keydown', event => {
    if(event.code === 'Space')
        updateUI();
});

btn.addEventListener('click', updateUI);