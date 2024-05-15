const run_1 = document.getElementById("run_1");
const run_2 = document.getElementById("run_2");
const run_3 = document.getElementById("run_3");
const run_4 = document.getElementById("run_4");
const run_5 = document.getElementById("run_5");
const run_6 = document.getElementById("run_6");

document.getElementById("Instructions").style.display = "none";
document.getElementById("toss").style.display = "none";
document.getElementById("toss-res").style.display = "none";
document.getElementById("game").style.display = "none";
document.getElementById("results").style.display = "none";

const randomValue = Math.random();
var comp_toss_win_choice = -1;

function tossStart() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("toss").style.display = "flex";
}

function flipCoin(userChoice) {
    const coin = document.getElementById('coin');
    if (randomValue >= 0.5) {
        coin.style.transform = 'rotateX(720deg)';
        document.getElementById("res").innerHTML = "H";
    } else {
        coin.style.transform = 'rotateX(-720deg)';
        document.getElementById("res").innerHTML = "T";
    }

    setTimeout(() => {
        if ((userChoice === 'Heads' && randomValue >= 0.5) || (userChoice === 'Tails' && randomValue < 0.5)) {
            setTimeout(() => {
                document.getElementById("toss").style.display = "none";
                document.getElementById("toss-res").style.display = "flex";
            }, 1500);
        } else {
            document.getElementById("toss-res-text").innerHTML = "<h1>Oh!</h1><h2>You Lost the Toss</h2>";

            comp_toss_win_choice = Math.random();
            if (comp_toss_win_choice >= 0.5) {
                document.getElementById("toss-choice-cont").innerHTML = "<h3>Computer Has decided to Bat First</h3>";
            } else {
                document.getElementById("toss-choice-cont").innerHTML = "<h3>Computer Has decided to Bowl First</h3>";
            }

            setTimeout(() => {
                document.getElementById("toss").style.display = "none";
                document.getElementById("toss-res").style.display = "flex";

                setTimeout(() => {
                    gameStart();
                }, 1000);

            }, 1500);
        }
    }, 500);
}

var scoreC = 0; // Score of comp
var scoreP = 0; // Score of Player
var flag = 1; // Indicator of Batsmen

// Game
var sC = 0, SP = 0;
// Deciding Who Bats First

function gameStart(UserInput = comp_toss_win_choice) {
    if (UserInput === 2 || UserInput < 0.5) { // Player Bats first
        bat_first();
    }
    else if (UserInput === 3 || UserInput > 0.5) { // Player Bowls first
        bowl_first();
    }

    document.getElementById("toss-res").style.display = "none";
    document.getElementById("game").style.display = "flex";
}

function showResult(){
    if (scoreC > scoreP) {
        document.getElementById("out-title").innerHTML = "<h1> Nice Try </h1> <h2> But You Lost! </h2>";
        document.getElementById("game").style.display = "none";
        document.getElementById("results").style.display = "flex";
    }
    else if (scoreC === scoreP) {
        document.getElementById("out-title").innerHTML = "<h1> You played Well! <h1> <h2> Game's Draw </h2>";
        document.getElementById("game").style.display = "none";
        document.getElementById("results").style.display = "flex";
    }
    else if (scoreC < scoreP) {
        document.getElementById("game").style.display = "none";
        document.getElementById("results").style.display = "flex";
    }
}

// Player Bats First...
function bat_first() {
    run_1.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(1);
        else if (flag === 2) plyBowlSecond(1);
        else if(flag === 3) showResult();
    })
    run_2.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(2);
        else if (flag === 2) plyBowlSecond(2);
        else if(flag === 3) showResult();
    })
    run_3.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(3);
        else if (flag === 2) plyBowlSecond(3);
        else if(flag === 3) showResult();
    })
    run_4.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(4);
        else if (flag === 2) plyBowlSecond(4);
        else if(flag === 3) showResult();
    })
    run_5.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(5);
        else if (flag === 2) plyBowlSecond(5);
        else if(flag === 3) showResult();
    })
    run_6.addEventListener('click', function () {
        if (flag === 1) plyBatFirst(6);
        else if (flag === 2) plyBowlSecond(6);
        else if(flag === 3) showResult();
    })
}

function plyBatFirst(plyChoice) {
    const randomChoice = Math.round(Math.random() * 5 + 1);
    // image generation
    switch (randomChoice) {
        case 1:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/oneR.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/twoR.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/threeR.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fourR.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fiveR.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/sixR.png" alt="SIX">';
            break;
    }
    // image generation
    switch (plyChoice) {
        case 1:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/oneL.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/twoL.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/threeL.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fourL.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fiveL.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/sixL.png" alt="SIX">';
            break;
    }

    if (randomChoice === plyChoice) {
        document.getElementsByClassName("status")[0].innerHTML = 'OUT';
        document.getElementById("Scr-P").innerHTML = scoreP;
        SP = scoreP;
        flag = 2;
    }
    else {
        document.getElementsByClassName("status")[0].innerHTML = plyChoice;
        scoreP += plyChoice;
        document.getElementById("Scr-P").innerHTML = scoreP + '*';
    }
}

function plyBowlSecond(plyChoice) {
    const randomChoice = Math.round(Math.random() * 5 + 1);
    // image generation
    switch (randomChoice) {
        case 1:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/oneR.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/twoR.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/threeR.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fourR.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fiveR.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/sixR.png" alt="SIX">';
            break;
    }
    // image generation
    switch (plyChoice) {
        case 1:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/oneL.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/twoL.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/threeL.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fourL.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fiveL.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/sixL.png" alt="SIX">';
            break;
    }

    if (randomChoice === plyChoice) {
        document.getElementsByClassName("status")[0].innerHTML = 'OUT';
        document.getElementById("Scr-C").innerHTML = scoreC;
        sC = scoreC;
        flag = 3;
    }
    else {
        document.getElementsByClassName("status")[0].innerHTML = randomChoice;
        scoreC += randomChoice;
        document.getElementById("Scr-C").innerHTML = scoreC + '*';
        if(scoreC > scoreP) flag = 3;
    }
}


// Player Bowls First...
function bowl_first() {
        run_1.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(1);
            else if (flag === 2) plyBatSecond(1);
            else if(flag === 3) showResult();
        })
        run_2.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(2);
            else if (flag === 2) plyBatSecond(2);
            else if(flag === 3) showResult();
        })
        run_3.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(3);
            else if (flag === 2) plyBatSecond(3);
            else if(flag === 3) showResult();
        })
        run_4.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(4);
            else if (flag === 2) plyBatSecond(4);
            else if(flag === 3) showResult();
        })
        run_5.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(5);
            else if (flag === 2) plyBatSecond(5);
            else if(flag === 3) showResult();
        })
        run_6.addEventListener('click', function () {
            if (flag === 1) plyBowlFirst(6);
            else if (flag === 2) plyBatSecond(6);
            else if(flag === 3) showResult();
        })
}

function plyBowlFirst(plyChoice) {
    const randomChoice = Math.round(Math.random() * 5 + 1);
    // image generation
    switch (randomChoice) {
        case 1:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/oneR.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/twoR.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/threeR.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fourR.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fiveR.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/sixR.png" alt="SIX">';
            break;
    }
    // image generation
    switch (plyChoice) {
        case 1:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/oneL.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/twoL.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/threeL.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fourL.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fiveL.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/sixL.png" alt="SIX">';
            break;
    }

    if (randomChoice === plyChoice) {
        document.getElementsByClassName("status")[0].innerHTML = 'OUT';
        document.getElementById("Scr-C").innerHTML = scoreC;
        sC = scoreC;
        flag = 2;
    }

    else {
        document.getElementsByClassName("status")[0].innerHTML = randomChoice;
        scoreC += randomChoice;
        document.getElementById("Scr-C").innerHTML = scoreC + '*';
    }
}

function plyBatSecond(plyChoice) {
    const randomChoice = Math.round(Math.random() * 5 + 1);
    // image generation
    switch (randomChoice) {
        case 1:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/oneR.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/twoR.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/threeR.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fourR.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/fiveR.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("comp-i")[0].innerHTML = '<img src="./images/sixR.png" alt="SIX">';
            break;
    }
    // image generation
    switch (plyChoice) {
        case 1:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/oneL.png" alt="ONE">';
            break;

        case 2:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/twoL.png" alt="TWO">';
            break;

        case 3:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/threeL.png" alt="THREE">';
            break;

        case 4:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fourL.png" alt="FOUR">';
            break;

        case 5:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/fiveL.png" alt="FIVE">';
            break;

        case 6:
            document.getElementsByClassName("ply-i")[0].innerHTML = '<img src="./images/sixL.png" alt="SIX">';
            break;
    }

    if (randomChoice === plyChoice) {
        document.getElementsByClassName("status")[0].innerHTML = 'OUT';
        document.getElementById("Scr-P").innerHTML = scoreP;
        SP = scoreP;
        flag = 3;
    }
    else {
        document.getElementsByClassName("status")[0].innerHTML = plyChoice;
        scoreP += plyChoice;
        document.getElementById("Scr-P").innerHTML = scoreP + '*';
        if (scoreP > scoreC) {
            flag = 3;
        }
    }
}