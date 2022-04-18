
function convert(){
    let a=document.getElementsByName("name");
    for(var i=0;i<a.length;i++){
        var b=(a[i].value).charAt(0).toUpperCase()+(a[i].value).slice(1);
        a[i].value=b;
    }
}
let x= document.querySelector("#name");
let y= document.querySelector("#joke");
let z=document.querySelector("#nam");
const del= document.getElementById("del");
let up=document.querySelector("#up");
let s=document.querySelector("#n");

//let se= document.querySelector("#search");
//let b= document.querySelector("#back");
del.addEventListener('click',_=>{
    fetch('/jokes',{
        method:'delete',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
            name:`${z.value}`
        }),
    }).then(res=>{
        if(res.ok){
            return res.json();
        }
    }).then(result=>window.location.reload());
})
up.addEventListener('click',_=>{
    fetch('/jokes',{
        method:'put',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({
            name:`${x.value}`,
            joke:`${y.value}`
        }),
    }).then(res=>{
            if(res.ok){
                return res.json;
            }
        }).then(result=>window.location.reload(true))
    })
/*se.addEventListener('click',_=>{
    fetch('/jokes/search').then(res=>{
        if(res.ok){
            return res.json();
        }
    }).then(result=>window.location.reload(true))
})
b.addEventListener('click',_=>{
    fetch('/').then(res=>{
        if(res.ok){
            return res.json
        }
    }).then(result=>{
        window.location.reload();
    })
})*/