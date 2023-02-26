//Variables
let player_score=0;
let Computer_score=0;
const btn = document.getElementById('head');
const score = document.getElementById('score');
const tail = document.getElementById('tail');
const Heads = document.getElementsByClassName('choosenHead');
let P_score = document.getElementById('playerScore');
let C_score = document.getElementById('computerscore');
// logic


function Int(max) {
    return Math.floor(Math.random() * max);
  }
function headToTail()
{
 if((Int(2))%2==0)
 {
     console.log("heads");
score.innerHTML="Heads";
     btn.style.display= "initial";
     tail.style.display= "none";
     player_score+=1;
     if(player_score<=4){
     P_score.innerHTML=player_score;
     }else{
         P_score.innerHTML="You WON THE GAME";
         C_score.innerHTML="Computer Lost";
         player_score=0;
            Computer_score=0;
     }
 }else{
     console.log("tails");
     score.innerHTML="Tails";
     tail.style.display= "initial";
     btn.style.display= "none";
     Computer_score+=1;
    if(Computer_score<=4){
        C_score.innerHTML=Computer_score;
        }else{
            C_score.innerHTML="Computer WON THE GAME";
            P_score.innerHTML="You lost";
            player_score=0;
            Computer_score=0;
        }
 }   
}