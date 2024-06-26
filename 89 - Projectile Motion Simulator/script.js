import { Projectile } from './Projectile.js';

let verVel = document.getElementById('ver-vel')
let horVel = document.getElementById('hor-vel')
let initVelocity = document.getElementById('velocity');
let angle = document.getElementById('angle');
let launch = document.getElementById('launch');
let reset = document.getElementById('reset');
let board = document.querySelector('.board');
let projectile = document.getElementById('projectile');
window.projectileObj = null;
launch.disabled = true;
let inputState1 = true;
let inputState2 = true;

const validateInputs = () => {
    inputState1 = initVelocity.value === '' || isNaN(initVelocity.value) || initVelocity.value <= 0 || initVelocity.value > 120;
    inputState2 = angle.value === '' || isNaN(angle.value) || angle.value < 0 || angle.value > 90;
    initVelocity.style.color = inputState1 ? 'red' : 'green';
    angle.style.color = inputState2 ? 'red' : 'green';
    launch.disabled = inputState1 || inputState2;
};

initVelocity.addEventListener('input', validateInputs);
angle.addEventListener('input', validateInputs);

launch.addEventListener('click', () => {
    if (window.projectileObj) window.projectileObj.reset();
    window.projectileObj = new Projectile(projectile, 0, 0, parseInt(initVelocity.value), parseInt(angle.value));
    window.projectileObj.launch();
    horVel.innerText = window.projectileObj.vx.toFixed(2);
    board.style.height = `${parseInt(window.projectileObj.maxHeight + 100)}px`;
    board.style.width = `${window.projectileObj.horizontalRange + 200}px`;
});

window.addEventListener('load', () => {
    initVelocity.value = "";
    angle.value = "";
});

reset.addEventListener('click', () => {
    initVelocity.value = "";
    angle.value = "";
    launch.disabled = true;

    if (window.projectileObj) window.projectileObj.reset();
    horVel.innerText = "0.00";
    verVel.innerText = "0.00";
    board.style.height = "100%";
    board.style.width = "100%";
    window.projectileObj = null;
});
