var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var highScore=0;

var h2=document.querySelector("h2");

$(document).keypress(function(){
    if(started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour); 
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

     if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            highScore=Math.max(highScore,level);
            nextSequence();
          }, 1000);
    }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text(`Game Over, Your score is ${Math.max(0,level-1)}. Press Any Key to Restart`);
        h2.innerText=`HighScore : ${highScore}`;
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();      
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
    
}
