var min = 0, sec = 0, session_min = 0, break_min = 0, break_sec = 0, sessionId = 0, sId = null, bId = null, mode = null, paused = false;

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const sessionTime = document.getElementById('sessionTime');
const breakTime = document.getElementById('breakTime');
const session = document.getElementById('session');
const countdown = document.getElementById('countdown');
const frame = document.getElementsByClassName('frame')[0];
const sessionDecrementBtn = document.getElementById('sessionDecrementBtn');
const sessionIncrementBtn = document.getElementById('sessionIncrementBtn');
const breakDecrementBtn = document.getElementById('breakDecrementBtn');
const breakIncrementBtn = document.getElementById('breakIncrementBtn');

function setSession() {
    if(!mode) session.innerHTML = 'Set Time & Start';
    else session.innerHTML = `${mode} ${sessionId}`;
}
function setSessionTime() {
    sessionTime.innerHTML = session_min + ' min';
}

function setBreakTime() {
    breakTime.innerHTML = break_min + ' min';
}

function setCountdown() {
    countdown.innerHTML = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
}

function reset() {
    pauseBtn.classList.add('d-none');
    startBtn.classList.remove('d-none');
    frame.classList.remove('bg-info');
    frame.classList.remove('bg-danger');
    frame.classList.add('bg-success');
    countdown.classList.remove('text-info');
    countdown.classList.remove('text-danger');
    countdown.classList.add('text-success');
    breakDecrementBtn.disabled = false;
    breakIncrementBtn.disabled = false;
    sessionDecrementBtn.disabled = false;
    sessionIncrementBtn.disabled = false;
    if(sId) clearInterval(sId);
    if(bId) clearInterval(bId);
    min = 0;
    sec = 0;
    session_min = 5; 
    break_min = 5;
    break_sec = 0;
    sessionId = 0;
    mode = null;
    paused = false;
    setSession();
    setSessionTime();
    setBreakTime();
    setCountdown();
}

function breakCountdown() {
    if(!paused) {
        min = break_min;
        sec = 0;
    }
    else paused = false;
    mode = 'Break';
    setSession();
    frame.classList.remove('bg-success');
    frame.classList.remove('bg-info');
    frame.classList.add('bg-danger');
    countdown.classList.remove('text-success');
    countdown.classList.remove('text-info');
    countdown.classList.add('text-danger');
    setCountdown();
    bId = setInterval(function() {
        if(sec === 0) {
            min--;
            if(min < 0) {
                min = 0;
                sec = 0;
                clearInterval(bId);
                sessionCountdown();
            }
            else sec = 59;
        }
        else {
            sec--;
        }
        setCountdown();
    }, 1000);
}

function sessionCountdown() {
    if(!paused) {    
        min = session_min;
        sec = 0;
        sessionId++;
    }
    else paused = false;
    mode = 'Session';
    setSession();
    frame.classList.remove('bg-success');
    frame.classList.remove('bg-danger');
    frame.classList.add('bg-info');
    countdown.classList.remove('text-success');
    countdown.classList.remove('text-danger');
    countdown.classList.add('text-info');
    setCountdown();
    sId = setInterval(function() {
        if(sec === 0) {
            min--;
            if(min < 0) {
                min = 0;
                sec = 0;
                clearInterval(sId);
                breakCountdown();
            }
            else sec = 59;
        }
        else {
            sec--;
        }
        setCountdown();
    }, 1000);
}

function start() {
    startBtn.classList.add('d-none');
    pauseBtn.classList.remove('d-none');
    breakDecrementBtn.disabled = true;
    breakIncrementBtn.disabled = true;
    sessionDecrementBtn.disabled = true;
    sessionIncrementBtn.disabled = true;
    if(paused && mode === 'Break') breakCountdown();
    else sessionCountdown();
}

function pause() {
    paused = true;
    if(mode === 'Session') {
        clearInterval(sId);
    }
    else if(mode === 'Break') {
        clearInterval(bId);
    }
    pauseBtn.classList.add('d-none');
    startBtn.classList.remove('d-none');
}

sessionIncrementBtn.addEventListener('click', function() {
    if(session_min < 59) session_min++;
    setSessionTime();
});

sessionDecrementBtn.addEventListener('click', function() {
    if(session_min > 0) session_min--;
    setSessionTime();
});

breakIncrementBtn.addEventListener('click', function() {
    if(break_min < 59) break_min++;
    setBreakTime();
});

breakDecrementBtn.addEventListener('click', function() {
    if(break_min > 0) break_min--;
    setBreakTime();
});

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
pauseBtn.addEventListener('click', pause);

reset();