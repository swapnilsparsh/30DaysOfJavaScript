const counter = document.getElementById('counter');
const increase = document.querySelector('.increase');
const decrease = document.querySelector('.decrease');
const reset = document.querySelector('.btn-reset');
const save = document.querySelector('.btn-save');

let count = 0;
increase.addEventListener('click', () => {
    count++;
    counter.innerHTML = count;
});

decrease.addEventListener('click', () => {
    count--;
    counter.innerHTML = count;
});
reset.addEventListener('click', () => {
    count = 0;
    counter.innerHTML = count;
});
save.addEventListener('click', () => {
    const number = document.querySelector('.number');
    const num = document.createElement('div');
    num.setAttribute('class', 'num');
    num.innerHTML = count;
    number.appendChild(num);
});


