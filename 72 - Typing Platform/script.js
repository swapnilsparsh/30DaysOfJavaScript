const SectionElement=document.querySelector('.section');
const world=document.querySelector('body');
const restart=document.querySelector('.restart');
const timerdis=document.querySelector('.typingspeed');
let count=0;
let bug;
let timing=45;
let html;
let error;
let border;
let text;
let length;
let timer;
let start;
let end;
let  random;
let replaceitem;
let check;
let stopfun;
let i=0;
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}


function replace()
{
    let x=start;
    let y=end;


    while(x<=y)
    {
    text=text.replaceAt(y+1,text[y]);
    y=y-1;
    }
    text=text.replaceAt(y+1,replaceitem);
    SectionElement.innerHTML='';
    SectionElement.insertAdjacentHTML('afterbegin',text); 
    start=start+1;
    end=end+1;
}


function letstart()
{
    timing=45;
    timerdis.classList.remove('hidden');
    timerdis.textContent=`${timing}`;
    stopfun=setInterval(function()
    {
        timing=timing-1;
        timerdis.textContent=`${timing}`;
        if(timing==0)
{
    console.log('End');
        clearInterval(stopfun);
        timerdis.classList.add('hidden');
        count=0;
        bug=1;
        // timing=30;
        SectionElement.innerHTML='';
        html=`<div class="done">Accuracy ${(100-(error/lenght*100)).toFixed(2)}%</div>`
        SectionElement.insertAdjacentHTML('beforeend',html);
        return;
}


    },1000);
}

init();
function init()
{
    error=0;
    start=20;
    end=26;
    SectionElement.innerHTML='';
const data=fetch('backend.json').then(response=>{
    return response.json();
}).then(data=>{
    random=Math.floor(Math.random()*51);
    text=`<span class="decor"></span>${data.paragraphs[random]}`;
    SectionElement.insertAdjacentHTML('beforeend',text); 
   border=document.querySelector('.decor');
    length=text.length;
    check=data.paragraphs[random];
    // start=19;
    // end=24;
    // replaceitem=text[end+1];
});
}

function endingit()
{
    bug=1;
    clearInterval(stopfun);
    timerdis.classList.add('hidden');
    count=0;
    // timing=30;
    SectionElement.innerHTML='';
    html=`<div class="done">Accuracy ${(100-(error/lenght*100)).toFixed(2)}%</div>`
    SectionElement.insertAdjacentHTML('beforeend',html);
}

function ErrorRender()
{
    error=error+1;
            world.style.transition='.3s';
            world.style.backgroundColor='rgb(255, 127, 127)';
            setTimeout(function()
            {
                world.style.backgroundColor='#191826';
            }, 200);
}
window.addEventListener('keypress',function(e){

    if(bug===1)
    {
        return 
    }
    else{
    if(count===0)
    {
        letstart();
        count=1;
    }
    if(end>length-3)
    {
        if(e.key===text[end+1])
        {
       endingit();
        }
        else{
            ErrorRender();

        }
        return;
    }
    else{
    replaceitem=text[end+1];
    if(e.key===replaceitem)
    {
    replace();
    }
    else{
        ErrorRender();
    }
    }
}
})

restart.addEventListener('click',function()
{
    count=0;
    bug=0;
    timerdis.classList.add('hidden');
    clearInterval(stopfun);
    init();
});