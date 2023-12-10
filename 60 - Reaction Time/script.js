var start = new Date().getTime();
//function to change color of shapes
function randcolor(){
    var colorArray = '0123456789ABCDEF';
    var hash  ='#';
    for(var i =0;i<6;i++){
        hash+=colorArray[Math.floor(Math.random()*16)];
    }
    document.getElementById("fig").style.backgroundColor = hash;
}
function figure(marg){
    document.getElementById("fig").style.margin = ""+marg+"px";
}
function shape(siz){
    start = new Date().getTime();

    var choice = Math.floor((Math.random()*2)+1);
    if(choice==1){
        document.getElementById("fig").style.width = ""+siz+"px";
        document.getElementById("fig").style.height = ""+siz+"px";
        document.getElementById("fig").style.borderRadius = "50%";

    }
    if(choice==2){
        document.getElementById("fig").style.width = ""+siz+"px";
        document.getElementById("fig").style.height = ""+siz+"px";
        document.getElementById("fig").style.borderRadius = "0";
    }
}


    document.getElementById("fig").onclick = function(){
        var end = new Date().getTime();
        var timeTaken = (end-start)/1000;
        document.getElementById("tTaken").innerHTML = timeTaken;
        var marg = Math.floor((Math.random()*600)+50);
        var siz = Math.floor((Math.random()*100)+50);
        figure(marg,siz);
        shape(siz);
        randcolor();
    }
