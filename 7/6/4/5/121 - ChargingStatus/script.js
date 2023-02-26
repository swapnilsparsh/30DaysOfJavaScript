const display=document.querySelector('.what');
const batterypercent=document.querySelector('.batteryIndicator');
const getInfo=navigator.getBattery();
const chargingAni=document.querySelector('.selecting');

// navigator.getBattery().then(function(battery) {
//     console.log(battery)
//     var level = battery.level;
//     let result=level*100;
//     let dis=`${result}%`;
//     batterypercent.innerHTML=dis;
// });



setInterval(() => {
    Setup();
    
}, 1000);



function refresh()
{
    chargingAni.classList.remove('percent');

}

const Setup=function()
{
    refresh()
    getInfo.then((battery)=>{

    let level = battery.level;
        let result=Math.round(level*100);
        let dis=`${result}%`;
        batterypercent.innerHTML=dis;
        let colorwidth=160*level;

    if(battery.charging===true)
    {
        display.innerHTML='Connected'
        chargingAni.classList.remove('chargeshowR');
        chargingAni.classList.add('percent');
        if(result===100)
        {
            chargingAni.classList.remove('percent');
            chargingAni.classList.add('chargeshowG');
        }
       
    }
    else{
        display.innerHTML='Not Connected'
        let Chargewidth=160*level;
        chargingAni.style.width=`${Chargewidth/16}em`;
        if(result<=30)
        {
            chargingAni.classList.add('chargeshowR');
        }
        
        if(result>30){
        chargingAni.classList.add('chargeshowG');
        }
    }
})
}

Setup();
// getInfo.then((battery)=>{

//     let level = battery.level;
//         let result=Math.round(level*100);
//         console.log(result);
//         let dis=`${result}%`;
//         batterypercent.innerHTML=dis;
//         let colorwidth=160*level;

//     if(battery.charging)
//     {
//         chargingAni.classList.add('percent');
       
//     }
//     else{
//         display.innerHTML='Connect charger'
//         let Chargewidth=160*level;
//         chargingAni.style.width=`${Chargewidth}px`;
//         if(result<=30)
//         {
//             chargingAni.classList.add('chargeshowR');
//         }
        
//         if(result>30){
//         chargingAni.classList.add('chargeshowG');
//         }

//         if(result===100)
//         {
//             display.innerHTML='Remove Charger'
//         }
//     }
// })