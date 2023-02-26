function solve(){
    let x3 = parseFloat(document.getElementById("x3").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let x1 = parseFloat(document.getElementById("x1").value);
    let x0 = parseFloat(document.getElementById("x0").value);
    let x = document.getElementById("x");
    let y = document.getElementById("y");
    let z = document.getElementById("z");

    if(x3 ==0){
        alert("a value can't be zero");
        return 0;
    }

    let f = ((3.0 * x1 / x3) - ((x2 ** 2.0) / (x3 ** 2.0))) / 3.0;
    let g = (((2.0 * (x2 ** 3.0)) / (x3 ** 3.0)) - ((9.0 * x2 * x1) / (x3 **2.0)) + (27.0 * x0 / x3)) /27.0;
    let h = ((g ** 2.0) / 4.0 + (f ** 3.0) / 27.0);
    
    if (f==0 && g==0 && h==0){
        let res;
        if(x0/x3 >= 0){
            res = (x0 / x3) ** (1/3) * -1;
        }else{
            res = (-x0 / x3) ** (1/3);
        }
        x.value = y.value = z.value = res;
    }else if(h <= 0){
        let i = Math.sqrt(((g ** 2.0) / 4.0) - h);
        let j = i ** (1/3);
        let k = Math.acos(-(g / (2 * i)));
        let L = j * -1;
        let M = Math.cos(k/3);
        let N = Math.sqrt(3) * Math.sin(k/3);
        let P = (x2/(x3*3)) *-1;

        x.value = Math.round(2*j* Math.cos(k/3) - (x2/(x3*3)), 5);
        y.value = Math.round(L * (M + N) + P, 5);
        z.value = Math.round(L * (M - N) + P, 5);
    }else{
        let R = -(g/2) + Math.sqrt(h);
        let S;
        if(R>=0){
            S = R ** (1/3);
        }else{
            S = (-R) ** (1/3) * -1;
        }
        let T = -(g/2) - Math.sqrt(h);
        let U;
        if(T>=0){
            U = (T ** (1/3));
        }else{
            U = ((-T) ** (1/3)) * -1;
        }

        x.value = (S + U) - (x2 / (3.0 * x3));
        y.value = `${-(S + U) / 2 - (x2 / (3.0 * x3))}` + `+${(S - U) * Math.sqrt(3) * 0.5}j`;
        z.value = `${-(S + U) / 2 - (x2 / (3.0 * x3))}` + `-${(S - U) * Math.sqrt(3) * 0.5}j`;
    }

}