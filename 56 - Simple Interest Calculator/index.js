function answer(){
    var amount_input=parseInt(document.getElementById("amount").value);

    var rate_input= parseInt(document.getElementById("rate").value);

    var time_input= parseInt(document.getElementById("time").value);

    var intrest=amount_input*rate_input*(time_input/100);

    var total=intrest + amount_input;

    var amount_input=parseInt(document.getElementById("amount").value);

    document.getElementById("output1").innerHTML=amount_input;
    document.getElementById("output2").innerHTML=intrest;
    document.getElementById("output3").innerHTML=total;
};
