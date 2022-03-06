let search_icon=document.getElementById('search');
let toggle=1;
  
search_icon.addEventListener('click',function(){
    if (toggle==1)
    {
        let menu=document.getElementsByClassName('menu_item');
        console.log(menu)
        for(let i=0; i<menu.length;i++){
            menu[i].classList.add("hide_item");
        }  
        let search_bar=document.getElementsByClassName("search_bar");
        search_bar[0].classList.remove('inactive');
        search_bar[0].classList.add('active');
        toggle=0;

        
    }
    else{
        let menu=document.getElementsByClassName('menu_item');
    console.log(menu)
    for(let i=0; i<menu.length;i++){
        menu[i].classList.remove("hide_item");
    }
    let search_bar=document.getElementsByClassName("search_bar");
        search_bar[0].classList.add('inactive');
        search_bar[0].classList.remove('active');
    toggle=1;
    }

})

