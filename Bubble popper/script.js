document.addEventListener('DOMContentLoaded', (event) => {
    const scoreValue = document.getElementById('score-value');
    const timerValue = document.getElementById('timer');
    const hitValue = document.getElementById('hit');
    const bubbleContainer = document.getElementById('bubble-container');
  
    let score = 0;
    let timeLeft = 60;
    let targetNumber = generateTargetNumber();
  
    function startGame() {
      updateTimer();
      generateBubbles();
      const gameInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          clearInterval(gameInterval);
          endGame();
        }
      }, 1000);
    }
  
    function updateTimer() {
      timerValue.textContent = timeLeft;
    }
  
    function generateTargetNumber() {
      const target = Math.floor(Math.random() * 10);
      hitValue.textContent = target;
      return target;
    }
  
    function generateBubbles() {
      bubbleContainer.innerHTML = '';
      for (let i = 0; i < 152; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const bubbleNumber = Math.floor(Math.random() * 10);
        bubble.textContent = bubbleNumber;
        bubble.addEventListener('click', () => popBubble(bubble, bubbleNumber));
        bubbleContainer.appendChild(bubble);
      }
    }
  
    function popBubble(bubble, number) {
      bubbleContainer.removeChild(bubble);
      if (number === targetNumber) {
        score += 10;
      } else {
        score++;
      }
      scoreValue.textContent = score;
      targetNumber = generateTargetNumber();
      refillBubbles();
    }
  
    function refillBubbles() {
      const currentBubbles = bubbleContainer.children.length;
      for (let i = currentBubbles; i < 152; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const bubbleNumber = Math.floor(Math.random() * 10);
        bubble.textContent = bubbleNumber;
        bubble.addEventListener('click', () => popBubble(bubble, bubbleNumber));
        bubbleContainer.appendChild(bubble);
      }
    }
  
    function endGame() {
      alert(`Game over! Your score is ${score}.`);
      resetGame();
    }
  
    function resetGame() {
      score = 0;
      timeLeft = 60;
      scoreValue.textContent = score;
      timerValue.textContent = timeLeft;
      targetNumber = generateTargetNumber();
      generateBubbles();
    }
  
    startGame();
  });
  