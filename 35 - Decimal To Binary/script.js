let input = document.getElementById('input_number');
let output = document.getElementById('output_number');


function calculate(){
    let number = input.value;
    if(isNaN(number) || number==""){
        alert("given value is not a number");
        output.value = "";
    }
    if(number==0){
        output.value = 0;
    }
    else{
        let response = "";
        while(number>0){
            response=number%2 + response;
            number=Math.floor(number/2);
        }
        output.value = response;
    }

}