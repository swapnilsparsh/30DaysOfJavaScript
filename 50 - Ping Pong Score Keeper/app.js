const p1={
    score:0,
    button:document.querySelector('#playerOne'),
    display:document.querySelector('#pl1Display')
}

const p2={
    score:0,
    button:document.querySelector('#playerTwo'),
    display:document.querySelector('#pl2Display')
}


const scorelimit=document.querySelector('#scorecount')
const playSelect=document.querySelector('select')
const resetbtn=document.querySelector("#reset")
let isGameOver=false;
let wining;

function updateScore(player,opponent) {
    if(!isGameOver){
        player.score+=1;
        if(player.score===wining){
            isGameOver=true
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            player.button.disabled=true;
            opponent.button.disabled=true;
        }
        player.display.innerText=player.score
    }
}

p1.button.addEventListener('click',function(e){
    updateScore(p1,p2)
})

p2.button.addEventListener('click',function(e){
    updateScore(p2,p1)
})

resetbtn.addEventListener('click',reset)

playSelect.addEventListener('change',function(){
    wining=parseInt(this.value)
    reset();
})

function reset() {
    isGameOver=false;

    for(let p of [p1,p2]){
        p.display.textContent=0;
        p.display.classList.remove('has-text-success','has-text-danger');
        p.button.disabled=false;
        p.score=0
    } 
}

