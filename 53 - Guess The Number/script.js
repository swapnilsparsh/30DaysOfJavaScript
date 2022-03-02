

document.getElementById("submitGuess").addEventListener("click",checkGuess);


const randomNumber = Math.floor(Math.random() * 100) + 1
console.log('Random Number', randomNumber)

function checkGuess() {
      let guess = document.getElementById("guess")
      let myGuess = guess.value
      if (myGuess===""){
        alert("Enter a number please.")
        return;
      }
      if (myGuess == randomNumber) {
        feedback.textContent = "You got it right!"
      } else if (myGuess > randomNumber) {
        feedback.textContent = "Your guess was " + myGuess + ". That's too high. Try Again!"
      } else if (myGuess < randomNumber) {
       feedback.textContent = "Your guess was " + myGuess + ". That's too low. Try Again!"
     }
   }
