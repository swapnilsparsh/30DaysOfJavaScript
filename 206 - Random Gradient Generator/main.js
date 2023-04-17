//getting the code of the gradient
document.getElementById("add").onclick=()=>{
    document.getElementById("code").style.display="flex";
    document.getElementById("add").style.display="none";
}
//going back to the preview
document.getElementById("code-ic1").onclick=()=>{
    document.getElementById("code").style.display="none";
    document.getElementById("add").style.display="flex";
}
//generating the gradient

document.getElementById("ok").onclick=()=>{
    let r1=0,r2=0,g1=0,g2=0,b1=0,b2=0,theta=45;
    
    theta=document.getElementById("theta").value;
    if(theta==""){
        theta=45;
        document.getElementById("theta").value="45";
    }
    r1=Math.floor(Math.random()*255);
    r2=Math.floor(Math.random()*255);
    g1=Math.floor(Math.random()*255);
    g2=Math.floor(Math.random()*255);
    b1=Math.floor(Math.random()*255);
    b2=Math.floor(Math.random()*255);
    document.getElementById("body").style.transition="all 0.7s ease";
    document.getElementById("ok").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),black,black)`;
    document.getElementById("body").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}))`;
    document.getElementById("display").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}))`;
    document.getElementById("txt").innerHTML=`background-image: linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}));`;
    document.getElementById("code-ic2").style.display="flex";
    document.getElementById("txt").style.paddingTop="70px";
    document.getElementById("theta").onchange=()=>{
        let theta=45;
        theta=document.getElementById("theta").value;
        document.getElementById("ok").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),black,black)`;
        document.getElementById("body").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}))`;
        document.getElementById("display").style.backgroundImage=`linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}))`;
        document.getElementById("txt").innerHTML=`background-image: linear-gradient(${theta}deg,rgb(${r1},${g1},${b1}),rgb(${r2},${g2},${b2}));`;
    }
    document.getElementById("code-ic2").onclick=()=>{
        let code=document.getElementById("txt").innerHTML;
        navigator.clipboard.writeText(code);
        document.getElementById("txt").innerHTML="Code is copied to the clipboard!";
        document.getElementById("code-ic2").style.display="none";
        document.getElementById("txt").style.paddingTop="100px";
    }
}

//copying the gradient code to the clipboard
