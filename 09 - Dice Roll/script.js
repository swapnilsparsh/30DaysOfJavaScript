
document.querySelector("#btn").addEventListener("click",function(){
    var img1 = Math.floor(Math.random()*6) +1
    var img2 = Math.floor(Math.random()*6) +1
    document.querySelector("#img1").setAttribute("src","assets/"+img1+".png");
    document.querySelector("#img2").setAttribute("src","assets/"+img2+".png");
    if(img1>img2){
        document.querySelector("h2").textContent="Player 1 wins";
    }
    else if(img2>img1){
        document.querySelector("h2").textContent="Player 2 wins";
    }
    else{
        document.querySelector("h2").textContent="It's a draw";
    }
})



