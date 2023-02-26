function rpsGame(humanChoice) {
    
    let myChoice = number(humanChoice);
    let comChoice = random();
    
    let final=result(myChoice,comChoice);
    

    document.getElementById("message").innerHTML=`Human choice is ${str(myChoice)} and Computer choice is ${str(comChoice)} <br> ${final}`;
    
}

function random() {
    return Math.floor(Math.random() * 3);
}

function number(word) {
    if (word == "Rock") {
        return 0;
    }
    else if (word == "Paper") {
        return 1;
    }
    else if (word == "Scissors") {
        return 2;
    }
}

function str(number) {
    if (number == 0) {
        return "Rock";
    }
    else if (number == 1) {
        return "Paper";
    }
    else if (number == 2) {
        return "Scissors";
    }
}

function result(myChoice, comChoice) {
    if (myChoice == comChoice) {
        return "Tied";
    }
    else {
        if ((comChoice == 0  && myChoice == 1)|| (comChoice ==1  && myChoice ==2) || (comChoice ==2  && myChoice ==0)) {
            return "You won";
        }
        else if ((comChoice == 1  && myChoice == 0)|| (comChoice ==2  && myChoice ==1) || (comChoice ==0  && myChoice ==2)) {
            return "Computer won";
        }
    }
}