console.log("hi");

let startButton = document.getElementById("startbutton")
let startMenu = document.getElementsByClassName("startmenu")[0]

let searchButton = document.getElementById("searchbutton")
let searchMenu = document.getElementsByClassName("searchmenu")[0]

let widgetButton = document.getElementById("widgetbutton")
let widgetMenu = document.getElementsByClassName("widgetmenu")[0]

let fileExplorer = document.getElementById("fileExplorer")
let fileMenu = document.getElementsByClassName("filemenu")[0]

let storeButton = document.getElementById("storebutton")
let store = document.getElementsByClassName("microsoftstore")[0]


startButton.addEventListener("click",()=>{

    if(startMenu.style.bottom == "-650px"){
        widgetMenu.style.left = "-950px"
        searchMenu.style.bottom = "-650px"
        startMenu.style.bottom = "55px"
    }else{
        startMenu.style.bottom = "-650px"
    }
})

searchButton.addEventListener("click",()=>{

    if(searchMenu.style.bottom == "-650px"){
        widgetMenu.style.left = "-950px"
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "55px"
    }else{
        searchMenu.style.bottom = "-650px"
    }

})

widgetButton.addEventListener("click",()=>{

    if(widgetMenu.style.left == "-950px"){
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "-650px"
        widgetMenu.style.left = "0px"
    }else{
        widgetMenu.style.left = "-950px"
    }

})

fileExplorer.addEventListener("click",()=>{
    
    if(fileMenu.style.top == "-700px"){
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "-650px"
        widgetMenu.style.left = "-950px"
        store.style.top = "-800px"
        fileMenu.style.top = "100px"
    }else{
        fileMenu.style.top = "-700px"
    }
    
})


storeButton.addEventListener("click",()=>{

    if(store.style.top == "-800px"){
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "-650px"
        widgetMenu.style.left = "-950px"
        store.style.top = "50px"
    }else{
        store.style.top = "-800px"
    }

})
