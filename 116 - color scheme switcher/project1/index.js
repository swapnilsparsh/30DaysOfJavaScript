const buttons=document.querySelectorAll('.button');
const body=document.querySelector('body');

buttons.forEach(function (button) {
    console.log(button);
button.addEventListener('click',function(e){
    console.log(e);
    console.log(e.target);
    if(e.target.id==='grey'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='white'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='blue'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='yellow'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='red'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='magenta'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='pink'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='royalblue'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='rosybrown'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='lawngreen'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='silver'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='bisque'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='rebeccapurple'){
        body.style.backgroundColor=e.target.id;
    }
    if(e.target.id==='mediumspringgreen'){
        body.style.backgroundColor=e.target.id;
    }
});
    
});