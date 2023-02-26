function calc() {
    let num1 = Number(document.querySelector("#num1").value); // reads the value of the input type text
    let num3 = Number(document.querySelector("#num3").value);
    let sum = num1*10000 / ((num3*num3) / 100*100);
    document.getElementById("sum").value = sum.toFixed(2); 
  // changes the value of type text in input tag
}