
function toggle(e){
    console.log(e.className);
    if(e.className == "fa-solid fa-xmark absent"){
        e.className = "fa-solid fa-check present";
    }else{
        e.className = "fa-solid fa-xmark absent";
    }
    
}  
