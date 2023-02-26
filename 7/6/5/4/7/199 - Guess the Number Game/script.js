'use strict';
//console.log(document.querySelector('.message').textContent);

let secret = Math.trunc(Math.random()*20)+1;
let score=20;
let high=0;


const displayMessage=(message)=>{
    document.querySelector('.message').textContent=message;
}

document.querySelector('.check').addEventListener('click',function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    if(!guess){
        displayMessage("No number");
    }
    else if(guess===secret){
        displayMessage('Correct Number');
        document.querySelector('.number').textContent=secret;
        document.querySelector('body').style.backgroundColor='#60b347';
        document.querySelector('.number').style.width = '30rem';
        if(score>high){
            high=score;
            document.querySelector('.highScore').textContent=high;
        }
    }
    else if (guess !== secret) {
        if (score > 1) {
          // document.querySelector('.message').textContent =
          // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
          displayMessage(guess > secret ? '📈 Too high!' : '📉 Too low!');
          score--;
          document.querySelector('.score').textContent = score;
        } else {
          // document.querySelector('.message').textContent = '💥 You lost the game!';
          displayMessage('💥 You lost the game!');
          document.querySelector('.score').textContent = 0;
        }
      }
});

document.querySelector('.again').addEventListener('click', function(){
    score = 20;
  secret = Math.trunc(Math.random() * 20) + 1;


  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

})