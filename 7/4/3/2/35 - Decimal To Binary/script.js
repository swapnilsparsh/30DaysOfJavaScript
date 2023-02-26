function convert(){
    let to_convert = document.getElementById("to_convert").value;
    to_convert = parseFloat(to_convert)
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    
    // Validate provided inputs
    if(x==y || x<2 || y<2 || isNaN(to_convert)){
        alert("HUH!? -_-");
        return 0;
    }
    
    // Organising results
    let res;
    if(x==10){
        res = Con_Dec_to_Basey(to_convert, y);
    }else if(y==10){
        res = Conv_Basex_to_Dec(to_convert, x);
    }else{
        res = Conv_Basex_to_Dec(to_convert, x);
        res = Con_Dec_to_Basey(res, y);
    }

    // Visualizing results
    let final = document.getElementById("res");
    final.value = res;
}


function Con_Dec_to_Basey(to_convert, y){
    // Converting Integral part
    let integral_part = parseInt(to_convert);
    let res = [];
    while (parseInt(integral_part) != 0){
        integral_part /= y;
        let element = (integral_part - parseInt(integral_part)) * y;
        res.unshift(parseInt(element));
    }
    
    // Converting Decimal part
    let decimal_part = to_convert - parseInt(to_convert);
    let res_dec = [];
    let percision = 10; // Special case for binary
    while (decimal_part != 0){
        decimal_part = (decimal_part - parseInt(decimal_part)) * y
        // Special case for binary
        if (res_dec.includes(parseInt(decimal_part))){
            if(percision==0){
                break;
            }
            percision -=1;
        }
        res_dec.push(parseInt(decimal_part));
    }

    let final;    
    if (res_dec.length == 0){
        final = res.join(" ");
    }else{
        final = res.join(" ") + " . " + res_dec.join(" ");
    }
  return final;
}


function Conv_Basex_to_Dec(to_convert, x){
    let i = 0;
    let res = 0;

    let integral_part = parseInt(to_convert).toString().split("").reverse().join("");
    for(number of integral_part){
        let element = parseInt(number) * (x**i);
        res += element;
        i+=1;
    }

    let decimal_part = to_convert.toString().split(".")[1];
    if(decimal_part){
        i = -1;
        for(decimal of decimal_part){
            let element = parseInt(decimal) * (x**i);
            res+= element;
            i += -1;
        }
    }

  return res;
}