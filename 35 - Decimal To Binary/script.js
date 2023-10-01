function convert(){
    let to_convert = document.getElementById("to_convert").value;
    to_convert = parseFloat(to_convert)
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    
    // Validate provided inputs
    if(x==y || x<2 || y<2 || x>10 || y>10 || isNaN(to_convert)){
        alert("HUH!? -_-");
        return 0;
    }

    let number = to_convert;
    const base1 = x;
    const base2 = y;
    let number2 = 0;
    function convert(number){
        let count = 0;
        while(number>0){
            number2 = number2+ (number%10)*(base1**count);
            number = Math.floor(number/10);
            count+=1;
        }
    }
    
    
    // Organising results
    let res;
    res = convert(number);

    // Visualizing results
    let final = document.getElementById("res");
    final.value = res;

