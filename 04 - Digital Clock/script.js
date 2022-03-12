function clock(){
    
    let hour = document.getElementById('hour');
    let minute = document.getElementById('minute');
    let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');
    
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    var am = 'AM' ;

    // Conver 24 hour time to 12 hour format with AM/PM Indicator
    if (h > 12){
        h = h - 12;
        var am = 'PM' 
    }

    // Add 0 to the begining of number if less than 10
    h = ( h < 10 ) ? '0' + h : h ;
    m = ( m < 10 ) ? '0' + m : m ;
    s = ( s < 10 ) ? '0' + s : s ;

    hour.innerHTML = h;
    minute.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;
}

var interval = setInterval(clock, 1000);