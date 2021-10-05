window.onload = function () {
    
const audio = document.getElementById("audio");
var i=0;

setInterval(() => {
    audio.play();
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliSeconds = date.getMilliseconds();
    const secondsHandAngle = seconds*6 + 90;
    const minutesHandAngle = (minutes+(seconds/60))*6 + 90 ;
    const hoursHandAngle = (hours+(minutes/60))*30 + 90;
    document.getElementById("second-hand").style.transform="rotate("+ (secondsHandAngle+2) +"deg)";
    document.getElementById("minute-hand").style.transform="rotate("+ minutesHandAngle +"deg)";
    document.getElementById("hour-hand").style.transform="rotate("+ hoursHandAngle +"deg)";
    setTimeout(() => {
        document.getElementById("second-hand").style.transform="rotate("+ (secondsHandAngle-1) +"deg)";
    }, 40);
    setTimeout(() => {
        document.getElementById("second-hand").style.transform="rotate("+ (secondsHandAngle+0.5) +"deg)";
    }, 75);
    setTimeout(() => {
        document.getElementById("second-hand").style.transform="rotate("+ (secondsHandAngle) +"deg)";
    }, 87.5);
    // var interval=500/12;
    // for (let i = 1; i <=24 ; i++) {
    //    setTimeout(() => {
    //     document.getElementById("second-hand").style.transform="rotate("+ (secondsHandAngle-6+(0.25*i)) +"deg)";
    //    }, (interval*i));
    // }
    var hoursStr="";
    var minutesStr="";
    var secondsStr="";
    if (Math.floor(hours/10)==0) {
        hoursStr="0"+hours;
    }
    else{
        hoursStr=hours;
    }
    if (Math.floor(minutes/10)==0) {
        minutesStr="0"+minutes;
    }
    else{
        minutesStr=minutes;
    }
    if (Math.floor(seconds/10)==0) {
        secondsStr="0"+seconds;
    }
    else{
        secondsStr=seconds;
    }
    document.getElementById("screen").innerHTML=hoursStr+":"+minutesStr+":"+secondsStr;
    // document.getElementById("pendulum").style.transform="rotate("+ (secondsHandAngle + 90) +"deg)";
}, 1000);

}