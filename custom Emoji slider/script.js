const body = document.querySelector("body");
const emoji =  document.querySelector(".slide-emoji");
const input =document.querySelector("input");
const bar = document.querySelector(".progress-bar");
const thumb = document.querySelector(".thumb");
input.oninput=()=>{
    let SliderValue=input.value;
    thumb.style.left=SliderValue + '%';
    bar.style.width=SliderValue+'%';
    if(SliderValue<20){
        emoji.style.marginTop='0px';
        body.classList.add("angry");
        body.classList.remove("confuse");
        body.classList.remove("like");
    }
    if(SliderValue>=20){
        emoji.style.marginTop='-140px';
        body.classList.add("confuse");
        body.classList.remove("angry");
        body.classList.remove("like");
    }
    if(SliderValue>=40){
        emoji.style.marginTop='-280px';
    }
    if(SliderValue>=60){
        emoji.style.marginTop='-420px';
        body.classList.add("like");
        body.classList.remove("angry");
        body.classList.remove("confuse");
    }
    if(SliderValue>=80){
        emoji.style.marginTop='-560px';
    }

}