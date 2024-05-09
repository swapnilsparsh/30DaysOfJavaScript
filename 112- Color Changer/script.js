const getcolor=()=>{
    const randomNUM=Math.floor(Math.random()*16777215);

    //converting random number to hexadecimal
    const randomCode="#"+randomNUM.toString(16);

    //accessing background color
    document.body.style.backgroundColor=randomCode;
    
    //changing color hexadecimal name
    document.getElementById('color-code').innerHTML=randomCode;

    //used to copy to the clipborad
    navigator.clipboard.writeText(randomCode);

}

document.getElementById("btn").addEventListener("click", getcolor);
getcolor();