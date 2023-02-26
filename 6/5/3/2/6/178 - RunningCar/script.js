m=0;
var move;
var p=0;
const len=document.documentElement.scrollWidth;
function start(){
p++;
    if(p>1){
        clearInterval(move);
    }
    move =setInterval(run,100);

    function run(){
        if(m==1200){
            clearInterval(move);
            m=0;
            p=0;
        }
        else{
        m+=15;
        var carStart=document.getElementById("car");
        carStart.style.marginLeft=m+'px';
        }
    }
}

function stop(){
    clearInterval(move)
}

