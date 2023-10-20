// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Initialize variables
let attempts = 0;
let isGameOver = false;

// Function to check the user's guess
function checkGuess() {
  const guess = parseInt(prompt("Enter your guess (between 1 and 100):"));

  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100.");
  } else {
    attempts++;
    if (guess < secretNumber) {
      alert("Try a higher number.");
    } else if (guess > secretNumber) {
      alert("Try a lower number.");
    } else {
      isGameOver = true;
      alert(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`);
    }
  }

  if (!isGameOver) {
    checkGuess(); // Recursively call the function until the game is over
  }
}

// Start the game
checkGuess();
