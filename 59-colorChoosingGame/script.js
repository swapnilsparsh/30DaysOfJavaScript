var n=Math.floor(Math.random()*6);
var m=5;
var l;
var a=document.getElementById("co");
function easy(callback){
    var t= document.getElementsByClassName("on");
      for(let i=0;i<3;i++){
        t[i].style.visibility="visible";
      
   }
   m=2;
   l=m;
   n=3;
   document.querySelector(".row1").style.display="flex";
   document.querySelector(".row2").style.display="none";
   callback();
 }
 function hard(callback){
    var t= document.getElementsByClassName("on");
      for(let i=0;i<t.length;i++){
        t[i].style.visibility="visible";
      
   }
   m=5;
   l=m;
   n=6;
   document.querySelector(".row2").style.display="flex";
   document.querySelector(".row1").style.display="flex";
   callback();
 }
 function play(){
   //document.getElementsByClassName(".row").style.display="flex";
   document.getElementById("result").style.color="black";
   document.getElementById("result").innerText="Game Started!";
    var x= Math.floor((Math.random()*254)+1);
    var y=Math.floor((Math.random()*254)+1);
    var z=Math.floor((Math.random()*254)+1);
    a.innerText= "rgb("+x+", "+y+", "+z+")";
    var t= document.getElementsByClassName("on");
    var j= Math.floor(Math.random()*n);
    console.log(j);
    for(let i=0;i<t.length;i++){
      if(i!=j){
         t[i].style.backgroundColor="rgb("+Math.floor((Math.random()*254)+1)+","+Math.floor((Math.random()*254)+1)+","+Math.floor((Math.random()*254)+1)+")";
      }
      else{
         t[j].style.backgroundColor=a.innerText;
         console.log(t[j].style.backgroundColor);
         console.log(j);
      }
      

    }
    var u=document.getElementById("play");
    u.textContent="New colors";
 }
 function start(){
    m=5;
    l=m;
    var t= document.getElementsByClassName("on");
      for(let i=0;i<t.length;i++){
        t[i].style.visibility="visible";
      
   }
    document.querySelector(".row2").style.display="flex";
    document.querySelector(".row1").style.display="flex";
    //document.getElementsByClassName(".row").style.display="flex";
    document.getElementById("result").style.color="black";
    document.getElementById("result").innerText="Game Started!";
 	 var x= Math.floor((Math.random()*254)+1);
    var y=Math.floor((Math.random()*254)+1);
    var z= Math.floor((Math.random()*254)+1);
    a.innerText= "rgb("+x+", "+y+", "+z+")";
    var t= document.getElementsByClassName("on");
    var j= Math.floor(Math.random()*n);
    console.log(j);
    for(let i=0;i<t.length;i++){
      if(i!=j){
         t[i].style.backgroundColor="rgb("+Math.floor((Math.random()*254)+1)+","+Math.floor((Math.random()*254)+1)+","+Math.floor((Math.random()*254)+1)+")";
      }
      else{
         t[j].style.backgroundColor=a.innerText;
         console.log(t[j].style.backgroundColor);
         console.log(j);
      }
      

    }
    var u=document.getElementById("play");
    u.textContent="New colors";
 }
 
 function checka(){
   m=m-1;
   var z= document.getElementById("a");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   console.log(x);
   console.log(y);
   if(m==0){
      if(x==y){
         document.getElementById("result").innerText="Correct!";
         //document.querySelectorAll(".row").style.display="flex";
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=l;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
    document.getElementById("result").innerText="Correct!";
      }
      else{
         //document.querySelectorAll(".row").style.display="none";
         //z.style.backgroundColor="black";
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
   }
   else{
    //document.querySelectorAll(".row").style.display="flex";
    var t= document.getElementsByClassName("on");
    for(let i=0;i<=l;i++){
      t[i].style.visibility="visible";
      t[i].style.backgroundColor=y;
      
   }
    document.getElementById("result").innerText="Correct!";
    }
 }
 function checkb(){
   m=m-1;
   var z= document.getElementById("b");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   if(m==0){
      if(x==y){
         document.getElementById("result").innerText="Correct!";
         //document.querySelectorAll(".row").style.display="flex";
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=l;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
         document.getElementById("result").innerText="Correct!";
      }
      else{
         //document.querySelectorAll(".row").style.display="none";
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         //document.getElementById("result").style.color="red";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
      
   }
   else{
      //document.querySelectorAll(".row").style.display="flex";
      var t= document.getElementsByClassName("on");
      for(let i=0;i<=l;i++){
        t[i].style.visibility="visible";
        t[i].style.backgroundColor=y;
      
   }
      document.getElementById("result").innerText="Correct!";
   }
 }
 function checkc(){
   m=m-1;
   var z= document.getElementById("c");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   if(m==0){
      if(x==y){
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=l;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
         document.getElementById("result").innerText="Correct!";
      }
      else{
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
   }
   else{
      var t= document.getElementsByClassName("on");
      for(let i=0;i<=l;i++){
        t[i].style.visibility="visible";
        t[i].style.backgroundColor=y;
      
   }
      document.getElementById("result").innerText="Correct!";
   }
 }
 function checkd(){
   m=m-1;
   var z= document.getElementById("d");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   if(m==0){
      if(x==y){
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=l;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
         document.getElementById("result").innerText="Correct!";
      }
      else{
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
   }
   else{
      var t= document.getElementsByClassName("on");
      for(let i=0;i<=l;i++){
        t[i].style.visibility="visible";
        t[i].style.backgroundColor=y;
      
   }
      document.getElementById("result").innerText="Correct!";
   }
 }
 function checke(){
   m=m-1;
   var z= document.getElementById("e");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   if(m==0){
      if(x==y){
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=t.length;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
         document.getElementById("result").innerText="Correct!";
      }
      else{
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
   }
   else{
      var t= document.getElementsByClassName("on");
      for(let i=0;i<=l;i++){
        t[i].style.visibility="visible";
        t[i].style.backgroundColor=y;

      
   }
      document.getElementById("result").innerText="Correct!";
   }
 }
 function checkf(){
   m=m-1;
   var z= document.getElementById("f");
   var x= z.style.backgroundColor;
   var y=a.innerText;
   if(m==0){
      if(x==y){
         var t= document.getElementsByClassName("on");
         for(let i=0;i<=l;i++){
           t[i].style.visibility="visible";
           t[i].style.backgroundColor=y;
      
   }
         document.getElementById("result").innerText="Correct!";
      }
      else{
         document.querySelector(".row2").style.display="none";
         document.querySelector(".row1").style.display="none";
         document.getElementById("result").style.color="red";
         document.getElementById("result").innerText="You lost";
      }
   }
   else if(x!=y && m!=0){
      z.style.visibility="hidden";
      //z.style.backgroundColor="black";
      //document.getElementById("result").color="red";
      document.getElementById("result").innerText="Try Again";
   }
   else{
      var t= document.getElementsByClassName("on");
      for(let i=0;i<=l;i++){
        t[i].style.visibility="visible";
        t[i].style.backgroundColor=y;
      
   }
      document.getElementById("result").innerText="Correct!";
   }
 }
