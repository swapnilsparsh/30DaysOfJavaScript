
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var charac = document.getElementById("charac");
var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => 
{
    var random = Math.random()*3;
    var top = (random*100)+150;
    hole.style.top = -(top) + "px";
    counter++;
});

setInterval(function()
{
    var characTop= parseInt(window.getComputedStyle(charac).getPropertyValue("top"));
    if(jumping==0){
        charac.style.top = (characTop+3)+"px";
    }
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holetop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop=-(500-characTop)
    if ((characTop>490)||((blockleft<30)&&(blockleft>-20)&&((cTop<holetop)||(cTop>holetop+110))))
    {
        alert("game over. Score: " + counter);
        charac.style.top = 100+"px";
        counter=0;
    }
},30);

function jump()
{
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function()
    {
        var characTop = parseInt(window.getComputedStyle(charac).getPropertyValue("top"));

        if((characTop>6)&&(counter<215))
        {
            charac.style.top = (characTop-3)+"px";
        }
        if(jumpCount>20)
        {
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;

    },20);
}