const counter = document.getElementById('counter');
const increase = document.querySelector('.increase');
const decrease = document.querySelector('.decrease');

let count = 0;
increase.addEventListener("click", ()=>{
    count ++;
    counter.innerHTML = count;
});

decrease.addEventListener("click", ()=>{
    count --;
    counter.innerHTML = count;
})