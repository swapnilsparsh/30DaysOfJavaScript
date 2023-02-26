var rand = Math.floor(Math.random() * 3)+1;
var swap = rand;
function start(){
    document.getElementById(`div${rand}`).innerHTML = `<img class="w-100" src="./images/img.jpg">`;
    setTimeout(() => {
        document.getElementById(`div${rand}`).innerHTML = '?';
        var i = 0;
        myInterval = setInterval(() => {
            setTimeout(() => {
                do{
                    swap = Math.floor(Math.random()*3)+1;
                }while(rand == swap);
                console.log(i);
            }, 800);
            setTimeout(() => {
                if((rand == 1 && swap == 2) || (rand == 2 && swap == 1))
                {
                    document.getElementById('div2').style = "animation-name: swap1;animation-duration: 0.8s;"
                    document.getElementById('div1').style = "animation-name: swap2;animation-duration: 0.8s;"
                    rand = swap;
                    console.log(rand, swap);
                }
                else if((rand == 2 && swap == 3) || (rand == 3 && swap == 2))
                {
                    document.getElementById('div3').style = "animation-name: swap1;animation-duration: 0.8s;"
                    document.getElementById('div2').style = "animation-name: swap2;animation-duration: 0.8s;"
                    rand = swap;
                    console.log(rand, swap);
                }
                else if((rand == 1 && swap == 3) || (rand == 3 && swap == 1))
                {
                    document.getElementById('div3').style = "animation-name: swap3;animation-duration: 0.8s;"
                    document.getElementById('div1').style = "animation-name: swap4;animation-duration: 0.8s;"
                    rand = swap;
                    console.log(rand, swap);
                }
            }, 900);
            setTimeout(() => {
                document.getElementById('div1').style ="ainmation:none";
                document.getElementById('div2').style = "ainmation:none";
                document.getElementById('div3').style = "ainmation:none";
            }, 1500);
            i++;
            if(i>14)
            clearInterval(myInterval);
        }, 1600);
        document.getElementById('div1').addEventListener('click', ()=>{
            if(rand == 1)
            {
                document.getElementById('div1').innerHTML = `<img class="w-100" src="./images/img.jpg">`;
                setTimeout(() => {
                    alert('You Win');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
            else{
                document.getElementById('div1').innerHTML = `X`;
                document.getElementById('div1').style = 'font-size:300px; color: red; font-weight: bold';
                setTimeout(() => {
                    alert('You Lose');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
        })
        document.getElementById('div2').addEventListener('click', ()=>{
            if(rand == 2)
            {
                document.getElementById('div2').innerHTML = `<img class="w-100" src="./images/img.jpg">`;
                setTimeout(() => {
                    alert('You Win');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
            else{
                document.getElementById('div2').innerHTML = `X`;
                document.getElementById('div2').style = 'font-size:300px; color: red; font-weight: bold';
                setTimeout(() => {
                    alert('You Lose');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
        })
        document.getElementById('div3').addEventListener('click', ()=>{
            if(rand == 3)
            {
                document.getElementById('div3').innerHTML = `<img class="w-100" src="./images/img.jpg">`;
                setTimeout(() => {
                    alert('You Win');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
            else{
                document.getElementById('div3').innerHTML = `X`;
                document.getElementById('div3').style = 'font-size:300px; color: red; font-weight: bold';
                setTimeout(() => {
                    alert('You Lose');
                    setTimeout(()=>{location.reload();}, 500)
                }, 1000);
            }
        })
        
    }, 1000);
}