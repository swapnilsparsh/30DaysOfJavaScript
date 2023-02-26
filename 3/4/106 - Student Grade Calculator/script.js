function calculate(){
   let p =document.getElementById('p').value;
   let c =document.getElementById('c').value;
   let d =document.getElementById('d').value;
   let f =document.getElementById('f').value;
   const sum=parseFloat(p)+parseFloat(c)+parseFloat(d)+parseFloat(f)

document.getElementById("demo").innerHTML= `Your Total marks is = ${sum}`;
const percentage= (sum/400)*100;

document.getElementById("demo1").innerHTML= `Your  Perenatge marks is = ${percentage}%`;

if(percentage>=100){
    document.getElementById("demo2").innerHTML= `Your Grade is A++ 😎`;
}
else if(percentage>=80){
    document.getElementById("demo2").innerHTML= `Your Grade is A 🥰`;
}
else if(percentage>=60){
    document.getElementById("demo2").innerHTML= `Your Grade is B++ 🤗`;
}
else if(percentage>=40){
    document.getElementById("demo2").innerHTML= `Your Grade is B 😑`;
}
else{
    document.getElementById("demo2").innerHTML= `You are Fail !! 😡👿`;
}
}



