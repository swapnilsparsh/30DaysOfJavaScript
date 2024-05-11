let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".choice");
const userCount=document.querySelector("#user-score");
const compCount=document.querySelector("#comp-score");
let uc=0;
let cc=0;

const genCompChoice=()=>{
  //rock,paper,scissor generated randomly
  //store choices in the array
  const options=["rock","paper","scissor"];
  //for random indexes and we have to genrate it between 0 to 2 so if we multiply by 3 we get value between 0 to 3 where 3 is not included
  //and we will use math.floor  to get the integer value and not decimal
  let index=Math.floor(Math.random()*3);
  return options[index];
}


const draw=()=>{
  console.log("draw it is");
  
}

const playGame=(choiceId) => {
  console.log("user-choice=",choiceId);
  let compChoice=genCompChoice();
  console.log("comp choice=",compChoice);
 let msg=document.querySelector("#msg");
  if(choiceId===compChoice)
  //draw
{
  msg.innerText="It is a Draw!";
  msg.style.backgroundColor="#0D1821";
}
 else if(choiceId==="rock")//rock case
 {
  if(compChoice==="paper")
  { cc++;
    compCount.innerText=cc;
    console.log("lose");
    msg.innerText="You Lose.Paper beats Rock!";
    msg.style.backgroundColor="#800E13";
  }
  if(compChoice==="scissor")
  {
    uc++;
    userCount.innerText=uc;
    console.log("win");
    msg.innerText="You Win.Rock beats Scissor!";
    msg.style.backgroundColor="green";
  }
 }
 else if(choiceId==="paper")//paper case
 {
  if(compChoice==="rock")
  {
    uc++;
    userCount.innerText=uc;
    console.log("win");
    msg.innerText="You Win.Paper beats Rock!";
    msg.style.backgroundColor="green";
  }
  if(compChoice==="scissor")
  { cc++;
    compCount.innerText=cc;
    console.log("lose");
    msg.innerText="You Lose.Scissors beats Paper!";
    msg.style.backgroundColor="#800E13";
  }
 }
 else if(choiceId==="scissor")//scissor case
 {  
  if(compChoice==="rock")
  { cc++;
    compCount.innerText=cc;
    console.log("lose");
    msg.innerText="You Lose.Rock beats Scissors!";
    msg.style.backgroundColor="#800E13";
  }
  if(compChoice==="paper")
  { 

    uc++;
    userCount.innerText=uc;
    console.log("win");
    msg.innerText="You Win.Scissors beats Paper!";
    msg.style.backgroundColor="green";
  }
 }
};

choices.forEach((choice)=>{
  
  choice.addEventListener("click",()=>{
    let choiceId=choice.getAttribute("id");
    console.log(choiceId);
    playGame(choiceId);//for every choice like rock,paper or scissor we go the play function and check for the comp value wrt to the user choice entered 
  });
});

let btn=document.querySelector(".reset-score");
btn.addEventListener("click",()=>{
  console.log("score is reset");
  uc=0;
  cc=0;
  msg.innerText="Play your Game!";
  userCount.innerText="0";
  compCount.innerText="0";
  msg.style.backgroundColor="#7B2D26";
});