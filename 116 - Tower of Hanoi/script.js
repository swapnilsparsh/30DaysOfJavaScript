var no_of_plates = 3;
var step_count = 0;
let startTime = 1;
let time = startTime * 60;
var timerupdate;
var undostatearray=[];
var redostatearray=[];
const pltAdd = document.querySelector(".plateadd");
const pltDel = document.querySelector(".platedel");
const startgame = document.querySelector(".startbtn");
const resetgame = document.querySelector(".resetbtn");
const barDiv = document.getElementById("bar-1");
const dragPlate = document.querySelector(".plate");
const barsDivs = document.getElementsByClassName("bar");
const countdiv = document.querySelector(".noofPlates");
const stepcountdiv = document.querySelector(".countsteps");
const timercount = document.getElementById("timershow");
const undostate = document.getElementById("undo");
const redostate = document.getElementById("redo");

pltAdd.addEventListener("click",add_plate);
pltDel.addEventListener("click",del_plate);
startgame.addEventListener("click",start_game);
resetgame.addEventListener("click",reset_game);
undostate.addEventListener("click",undo_func);
redostate.addEventListener("click",redo_func);

// console.log(barsDivs.length);

function setplatedrags(){
    for(var i = 0; i < barsDivs.length; i++){
        if(barsDivs[i].childNodes.length >= 1){
            barsDivs[i].lastChild.draggable = true;
            for(var j = 0; j < barsDivs[i].childNodes.length - 1; j++){
                barsDivs[i].childNodes[j].draggable = false;
                // console.log(barsDivs[i].childNodes[j]);
            }
        }
    }
    // const allblocks = document.getElementsByClassName("block");
    // for(var i = 1 ; i <= allblocks.length ; i++) {
    //     var iblock = document.getElementById("block-" + i);
    //     iblock.draggable = false;
    // }

    // for(var i=0 ; i<3; i++){
    //     if(allDivs[i].childNodes.length > 0){
    //     allDivs[i].lastElementChild.draggable=true;
    //     }
    // }
}

pltDel.disabled = true;
resetgame.disabled = true;
undostate.disabled = true;
redostate.disabled = true;

function add_plate(){
    if(no_of_plates < 9){
        let new_plate = document.createElement('div');
        new_plate.classList.add('plate');
        no_of_plates = no_of_plates + 1;
        new_plate.id ='plate-' + no_of_plates;
        new_plate.setAttribute('draggable', false);
        new_plate.addEventListener('dragstart', drag);
        barDiv.insertBefore(new_plate,barDiv.firstChild);
        // barDiv.appendChild(new_plate);
        pltDel.disabled = false;
    }
    else{
        pltAdd.disabled = true;
    } 
    // console.log(no_of_plates);
    showNoOfPlates();
}
function del_plate(){
    if(no_of_plates > 3){
        no_of_plates = no_of_plates - 1;
        barDiv.removeChild(barDiv.firstChild);
        pltAdd.disabled = false;
    }
    else{
        pltDel.disabled = true;
    } 
    // console.log(no_of_plates);
    showNoOfPlates();
}

function start_game(){
    pltAdd.disabled = true;
    pltDel.disabled = true;
    startgame.disabled = true;
    resetgame.disabled = false;
    setplatedrags();
    time--;
    timerupdate = setInterval(updateTimer,1000);
}

function reset_game(){
    no_of_plates = 0;
    step_count = 0;
    showNoOfPlates();
    showStepCount();

    for(var i = 0; i < barsDivs.length; i++){
        while(barsDivs[i].firstChild)
        {
            // console.log(barsDivs[i].lastChild);
            barsDivs[i].removeChild(barsDivs[i].lastChild);
        }
    }

    for(var j=0; j < 3 ; j++){
        add_plate();
    }
    pltAdd.disabled = false;
    pltDel.disabled = true;
    startgame.disabled = false;
    resetgame.disabled = true;
    startTime = 1;
    time = startTime * 60;
    timercount.innerHTML = 'Time Left : 1:00';
    clearInterval(timerupdate);
}

function updateTimer(){
    const mins = Math.floor(time/60);
    let secs= time % 60;   

    secs = secs < 10 ? '0' + secs : secs;
    timercount.innerHTML = 'Time Left : ' + mins + ':' + secs;
    // console.log(mins);
    // console.log(secs);
    time--;
    win_condition();
    if(time < 0){
        alert("You Lose! Times Up!");
        undostate.disabled = true;
        redostate.disabled = true;
        startgame.disabled = true;
        resetgame.disabled = false;
        pltAdd.disabled = true;
        pltDel.disabled = true;
        clearInterval(timerupdate);
        for(var i = 0; i < barsDivs.length; i++){
            if(barsDivs[i].childNodes.length >= 1){
                barsDivs[i].lastChild.draggable = false;
                for(var j = 0; j < barsDivs[i].childNodes.length - 1; j++){
                    barsDivs[i].childNodes[j].draggable = false;
                    // console.log(barsDivs[i].childNodes[j]);
                }
            }
        }
    }
}

function showNoOfPlates() {
    countdiv.innerHTML = 'No of Plates : ' + no_of_plates;
}

function showStepCount() {
    if(step_count == 0){
        undostate.disabled = true;
    }
    else{
        undostate.disabled = false;
    }
    stepcountdiv.innerHTML = 'No of Steps : ' + step_count;
}

function undo_func() {
    var laststate = undostatearray.pop();
    const platemoved = document.getElementById(laststate.plate);
    const platesource = document.getElementById(laststate.source);
    const platedest = document.getElementById(laststate.dest);
    redostatearray.push(laststate);
    platesource.append(platemoved);
    step_count -= 1;
    time = time - 5;
    showStepCount();
    setplatedrags();
    redostate.disabled=false;
    if(undostatearray.length<=0) {
        undostate.disabled=true;
    }
}

function redo_func() {
    var laststate = redostatearray.pop();
    const platemoved = document.getElementById(laststate.plate);
    const platesource = document.getElementById(laststate.dest);
    const platedest = document.getElementById(laststate.source);
    undostatearray.push(laststate);
    platesource.append(platemoved);
    step_count += 1;
    showStepCount();
    setplatedrags();
    if(redostatearray.length<=0){
        redostate.disabled=true;
    }
}

function win_condition(){
    const bar1 = document.getElementById("bar-1");
    const bar2 = document.getElementById("bar-2");
    const bar3 = document.getElementById("bar-3");
    if((bar1.childNodes.length == 0 && bar2.childNodes.length == 0 && bar3.childNodes.length == no_of_plates) || (bar1.childNodes.length == 0 && bar2.childNodes.length == no_of_plates && bar3.childNodes.length == 0)){
        alert("Game Finished!! You did it.");
        undostate.disabled = true;
        redostate.disabled = true;
        startgame.disabled = true;
        resetgame.disabled = false;
        pltAdd.disabled = true;
        pltDel.disabled = true;
        clearInterval(timerupdate);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var x = document.getElementById(data);
    if(x.parentElement.lastElementChild.id == data) { 
        if(ev.target.className == "bar") {
            if((ev.target.childNodes.length == 0) || (ev.target.lastElementChild.id > data)){
                redostate.disabled = true;
                redostatearray.length = 0;
                undostatearray.push({'plate':data, 'source':x.parentElement.id, 'dest':ev.target.id });
                ev.target.appendChild(document.getElementById(data));
                step_count += 1;
                showStepCount();
                setplatedrags();
                time = time + 5;
            }
        }
    }
}