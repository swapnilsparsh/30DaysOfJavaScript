$(document).ready(function(){
  
    var magic8Ball = {};
    magic8Ball.listofanswers = ["It is certain.","Without a doubt.", "Yes, definitely.", "Most likely.","Yes.","My reply is no.","Very doubtful."];
   
    magic8Ball.getAnswer = function(question)
    {
      var randomNumber = Math.random();
      var randomAnswer = Math.floor(randomNumber * this.listofanswers.length);
      var answer = this.listofanswers[randomAnswer];
      
      $("#8ball").effect( "shake" );
      $("#answer").text( answer );
      $("#answer").fadeIn(3000);
      $("#8ball").attr("src", "assets/answer.png");
  
      console.log(question);
      console.log(answer);
    };
    $("#answer").hide();
  
    var onClick = function()
    {
      $("#answer").hide();
      $("#8ball").attr("src", "assets/8ball.png");
      var question = prompt("Ask me anything!");
      magic8Ball.getAnswer(question);
    };
    
    $("#questionButton").click( onClick );
  });