const colors = ["green ","red","rgba(133,122,200)","#f15025"];
const btn=document.getElementById('btn');
const color =document.querySelector(".bg");

btn.addEventListener('click', ()=>{
    //get randomg nu. between 0-3
    const randomNo = Math.floor(random() * colors.length );
    console.log(randomNo);
    document.body.style.backgroundColor = colors[randomNo];
    color.textContent = colors[randomNo];

})

const random = ()=>{
    return Math.random();
}