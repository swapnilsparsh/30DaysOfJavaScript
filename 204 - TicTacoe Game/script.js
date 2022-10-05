var origBoard;
var notsoimp=0;
var edgemove=1;
var aiPlayer='X';
var huPlayer='0';
const winCombos=[
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]
]

const cells=document.querySelectorAll('.cell');
startGame();

var colormode=document.getElementById("mode");
colormode.onclick=function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        colormode.src="https://img.icons8.com/emoji/38/000000/sun-emoji.png";
    }
    else{
        colormode.src="https://img.icons8.com/ios-filled/40/000000/crescent-moon.png";
    }
}

function startGame(){
    notsoimp=0;
    edgemove=0;
    document.querySelector(".endgame").style.width="0%";
    document.querySelector(".text").innerText="";
    document.querySelector(".endgame").style.opacity="0";
    document.getElementById("replay").style.display="none";
    //document.querySelector(".endgame").style.height="0px";
    origBoard=Array.from(Array(9).keys());
    for(var i=0;i<cells.length;i++)
    {
        document.getElementById(i).innerText="";
        document.getElementById(i).style.background="";
        document.getElementById(i).addEventListener("click",turnclick);
    }
}
function gamewon()
{
    if(((origBoard[0]===origBoard[1])&&(origBoard[1]===origBoard[2])))
    {
        document.getElementById("0").style.background="#ffa0a0";
        document.getElementById("1").style.background="#ffa0a0";
        document.getElementById("2").style.background="#ffa0a0";
        if(origBoard[0]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[3]===origBoard[4])&&(origBoard[4]===origBoard[5])))
    {
        document.getElementById("3").style.background="#ffa0a0";
        document.getElementById("4").style.background="#ffa0a0";
        document.getElementById("5").style.background="#ffa0a0";
        if(origBoard[3]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[6]===origBoard[7])&&(origBoard[7]===origBoard[8])))
    {
        document.getElementById("6").style.background="#ffa0a0";
        document.getElementById("7").style.background="#ffa0a0";
        document.getElementById("8").style.background="#ffa0a0";
        if(origBoard[6]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[0]===origBoard[3])&&(origBoard[3]===origBoard[6])))
    {
        document.getElementById("0").style.background="#ffa0a0";
        document.getElementById("3").style.background="#ffa0a0";
        document.getElementById("6").style.background="#ffa0a0";
        if(origBoard[0]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[1]===origBoard[4])&&(origBoard[4]===origBoard[7])))
    {
        document.getElementById("1").style.background="#ffa0a0";
        document.getElementById("4").style.background="#ffa0a0";
        document.getElementById("7").style.background="#ffa0a0";
        if(origBoard[1]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[2]===origBoard[5])&&(origBoard[5]===origBoard[8])))
    {
        document.getElementById("2").style.background="#ffa0a0";
        document.getElementById("5").style.background="#ffa0a0";
        document.getElementById("8").style.background="#ffa0a0";
        if(origBoard[2]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[0]===origBoard[4])&&(origBoard[4]===origBoard[8])))
    {
        document.getElementById("0").style.background="#ffa0a0";
        document.getElementById("4").style.background="#ffa0a0";
        document.getElementById("8").style.background="#ffa0a0";
        if(origBoard[0]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else if(((origBoard[2]===origBoard[4])&&(origBoard[4]===origBoard[6])))
    {
        document.getElementById("2").style.background="#ffa0a0";
        document.getElementById("4").style.background="#ffa0a0";
        document.getElementById("6").style.background="#ffa0a0";
        if(origBoard[2]=='X')
        gameOver(aiPlayer);
        else
        gameOver(huPlayer);
        return true;
    }
    else return false;
}

function gameOver(winner)
{
    // console.log("hey");
    if(winner=='X')
    displaywin="A.I. ";
    else
    displaywin="You ";
    document.querySelector(".endgame").style.width="350px";
  //  document.querySelector(".endgame").style.height="175px";
    document.querySelector(".endgame").style.opacity="1";
    document.getElementById("replay").style.display="block";
    document.querySelector(".text").innerText= displaywin + "won";
    for(var i=0;i<cells.length;i++)
    {
        document.getElementById(i).removeEventListener("click",turnclick);
    }
    return true;
}

function turnclick(square){
    turn(square.target.id,huPlayer);
    if(!gamewon())
    {
    /*    
    let count=1000;
    while(count--)
    {
        let x=Math.floor(Math.random()*9);
        console.log(x);
        if(origBoard[x]==='X'||origBoard[x]==='0')
        continue;
        else
        {
            turn(x,aiPlayer);
            break;
        }
    } */
    notsoimp++;
    aiturn();
    }
}

function turn(cellId,player)
{
    document.getElementById(cellId).innerText=player;
    document.getElementById(cellId).removeEventListener("click",turnclick);
    origBoard[cellId]=player;
    if(gamewon())
    {
        gamewon();
    }
    if(checktie()&&(!gamewon()))
    {
        gametie();
    }
}

function checktie()
{
    for(var i=0;i<cells.length;i++)
    {
        if(origBoard[i]==='X'||origBoard[i]==='0')
        continue;
        else
        return false;
    }
    return true;
}

function gametie()
{
    document.querySelector(".endgame").style.display="block";
    document.querySelector(".endgame").style.width="350px";
    document.querySelector(".endgame").style.opacity="1";
    document.getElementById("replay").style.display="block";
    document.querySelector(".text").innerText= "It's a tie!";
    for(var i=0;i<cells.length;i++)
    {
        document.getElementById(i).style.background="#ffa0a0";
        document.getElementById(i).removeEventListener("click",turnclick);
    }
}

function aiturn()
{
    if(notsoimp===1&&(origBoard[0]==="0"||origBoard[2]==="0"||origBoard[6]==="0"||origBoard[8]==="0"))
    {
        turn(4,aiPlayer);
    }
    else if(notsoimp===1&&(origBoard[4]==="0"))
    {
        let here=Math.floor(Math.random()*4);
        if(here===0)
        turn(0,aiPlayer);
        else if(here===1)
        turn(2,aiPlayer);
        else if(here===2)
        turn(6,aiPlayer);
        else
        turn(8,aiPlayer);
    }
    else if(notsoimp===1)
    {
        edgemove=1;
        turn(4,aiPlayer);
    }
    // 1st wincombo
    else if(origBoard[0]===origBoard[1]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"&&origBoard[0]==="X"))
    {
        turn(2,aiPlayer);
    }
    else if(origBoard[1]===origBoard[2]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"&&origBoard[1]==="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[2]&&(origBoard[1]!=="0"&&origBoard[1]!=="X"&&origBoard[0]==="X"))
    {
        turn(1,aiPlayer);
    }
    
    //2nd wincombo
    else if(origBoard[3]===origBoard[4]&&(origBoard[5]!=="0"&&origBoard[5]!=="X"&&origBoard[3]==="X"))
    {
        turn(5,aiPlayer);
    }
    else if(origBoard[4]===origBoard[5]&&(origBoard[3]!=="0"&&origBoard[3]!=="X"&&origBoard[4]==="X"))
    {
        turn(3,aiPlayer);
    }
    else if(origBoard[3]===origBoard[5]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"&&origBoard[3]==="X"))
    {
        turn(4,aiPlayer);
    }

    //3rd wincombo
    else if(origBoard[6]===origBoard[7]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"&&origBoard[6]==="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[7]===origBoard[8]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"&&origBoard[7]==="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[6]===origBoard[8]&&(origBoard[7]!=="0"&&origBoard[7]!=="X"&&origBoard[6]==="X"))
    {
        turn(7,aiPlayer);
    }

    //4th wincombo
    else if(origBoard[0]===origBoard[3]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"&&origBoard[0]==="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[3]===origBoard[6]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"&&origBoard[3]==="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[6]&&(origBoard[3]!=="0"&&origBoard[3]!=="X"&&origBoard[0]==="X"))
    {
        turn(3,aiPlayer);
    }

    //5th wincombo
    else if(origBoard[1]===origBoard[4]&&(origBoard[7]!=="0"&&origBoard[7]!=="X"&&origBoard[1]==="X"))
    {
        turn(7,aiPlayer);
    }
    else if(origBoard[4]===origBoard[7]&&(origBoard[1]!=="0"&&origBoard[1]!=="X"&&origBoard[4]==="X"))
    {
        turn(1,aiPlayer);
    }
    else if(origBoard[1]===origBoard[7]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"&&origBoard[1]==="X"))
    {
        turn(4,aiPlayer);
    }

    //6th wincombo
    else if(origBoard[2]===origBoard[5]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"&&origBoard[2]==="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[5]===origBoard[8]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"&&origBoard[5]==="X"))
    {
        turn(2,aiPlayer);
    }
    else if(origBoard[2]===origBoard[8]&&(origBoard[5]!=="0"&&origBoard[5]!=="X"&&origBoard[2]==="X"))
    {
        turn(5,aiPlayer);
    }

    //7th wincombo
    else if(origBoard[0]===origBoard[4]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"&&origBoard[0]==="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[4]===origBoard[8]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"&&origBoard[4]==="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[8]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"&&origBoard[0]==="X"))
    {
        turn(4,aiPlayer);
    }

    //8th wincombo
    else if(origBoard[2]===origBoard[4]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"&&origBoard[2]==="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[4]===origBoard[6]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"&&origBoard[4]==="X"))
    {
        turn(2,aiPlayer);
    }
    // 1st wincombo
    else if(origBoard[0]===origBoard[1]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"))
    {
        turn(2,aiPlayer);
    }
    else if(origBoard[1]===origBoard[2]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[2]&&(origBoard[1]!=="0"&&origBoard[1]!=="X"))
    {
        turn(1,aiPlayer);
    }
    
    //2nd wincombo
    else if(origBoard[3]===origBoard[4]&&(origBoard[5]!=="0"&&origBoard[5]!=="X"))
    {
        turn(5,aiPlayer);
    }
    else if(origBoard[4]===origBoard[5]&&(origBoard[3]!=="0"&&origBoard[3]!=="X"))
    {
        turn(3,aiPlayer);
    }
    else if(origBoard[3]===origBoard[5]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"))
    {
        turn(4,aiPlayer);
    }

    //3rd wincombo
    else if(origBoard[6]===origBoard[7]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[7]===origBoard[8]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[6]===origBoard[8]&&(origBoard[7]!=="0"&&origBoard[7]!=="X"))
    {
        turn(7,aiPlayer);
    }

    //4th wincombo
    else if(origBoard[0]===origBoard[3]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[3]===origBoard[6]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[6]&&(origBoard[3]!=="0"&&origBoard[3]!=="X"))
    {
        turn(3,aiPlayer);
    }

    //5th wincombo
    else if(origBoard[1]===origBoard[4]&&(origBoard[7]!=="0"&&origBoard[7]!=="X"))
    {
        turn(7,aiPlayer);
    }
    else if(origBoard[4]===origBoard[7]&&(origBoard[1]!=="0"&&origBoard[1]!=="X"))
    {
        turn(1,aiPlayer);
    }
    else if(origBoard[1]===origBoard[7]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"))
    {
        turn(4,aiPlayer);
    }

    //6th wincombo
    else if(origBoard[2]===origBoard[5]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[5]===origBoard[8]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"))
    {
        turn(2,aiPlayer);
    }
    else if(origBoard[2]===origBoard[8]&&(origBoard[5]!=="0"&&origBoard[5]!=="X"))
    {
        turn(5,aiPlayer);
    }

    //7th wincombo
    else if(origBoard[0]===origBoard[4]&&(origBoard[8]!=="0"&&origBoard[8]!=="X"))
    {
        turn(8,aiPlayer);
    }
    else if(origBoard[4]===origBoard[8]&&(origBoard[0]!=="0"&&origBoard[0]!=="X"))
    {
        turn(0,aiPlayer);
    }
    else if(origBoard[0]===origBoard[8]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"))
    {
        turn(4,aiPlayer);
    }

    //8th wincombo
    else if(origBoard[2]===origBoard[4]&&(origBoard[6]!=="0"&&origBoard[6]!=="X"))
    {
        turn(6,aiPlayer);
    }
    else if(origBoard[4]===origBoard[6]&&(origBoard[2]!=="0"&&origBoard[2]!=="X"))
    {
        console.log("hey");
        turn(2,aiPlayer);
    }
    else if(origBoard[2]===origBoard[6]&&(origBoard[4]!=="0"&&origBoard[4]!=="X"))
    {
        //console.log("hey");
        turn(4,aiPlayer);
    }
    //1st edge move comb
    else if(notsoimp===2&&edgemove===1&&(origBoard[1]==="0"&&origBoard[3]==="0"))
    {
        let here=Math.floor(Math.random()*3);
        if(here===0)
        {
            if(origBoard[0]!=="0"&&origBoard[0]!=="X")
            turn(0,aiPlayer);
            else if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else
            turn(6,aiPlayer);
        }
        else if(here===1)
        {
            if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else
            turn(0,aiPlayer);
        }
        else if(here===2)
        {
            if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else
            turn(0,aiPlayer);
        }
    }
    //2nd edge move combo
    else if(notsoimp===2&&edgemove===1&&(origBoard[1]==="0"&&origBoard[5]==="0"))
    {
        let here=Math.floor(Math.random()*3);
        if(here===0)
        {
            if(origBoard[0]!=="0"&&origBoard[0]!=="X")
            turn(0,aiPlayer);
            else if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else
            turn(8,aiPlayer);
        }
        else if(here===1)
        {
            if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else
            turn(0,aiPlayer);
        }
        else if(here===2)
        {
            if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else if(origBoard[0]!=="0"&&origBoard[0]!=="X")
            turn(0,aiPlayer);
            else
            turn(2,aiPlayer);
        }
    }
    //3rd edge move comb
    else if(notsoimp===2&&edgemove===1&&(origBoard[3]==="0"&&origBoard[7]==="0"))
    {
        let here=Math.floor(Math.random()*3);
        if(here===0)
        {
            if(origBoard[0]!=="0"&&origBoard[0]!=="X")
            turn(0,aiPlayer);
            else if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else
            turn(8,aiPlayer);
        }
        else if(here===1)
        {
            if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else
            turn(0,aiPlayer);
        }
        else if(here===2)
        {
            if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else if(origBoard[0]!=="0"&&origBoard[0]!=="X")
            turn(0,aiPlayer);
            else
            turn(6,aiPlayer);
        }
    }
    //4th win combo
    else if(notsoimp===2&&edgemove===1&&(origBoard[5]==="0"&&origBoard[7]==="0"))
    {
        let here=Math.floor(Math.random()*3);
        if(here===0)
        {
            if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else
            turn(8,aiPlayer);
        }
        else if(here===1)
        {
            if(origBoard[6]!=="0"&&origBoard[6]!=="X")
            turn(6,aiPlayer);
            else if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else
            turn(2,aiPlayer);
        }
        else if(here===2)
        {
            if(origBoard[8]!=="0"&&origBoard[8]!=="X")
            turn(8,aiPlayer);
            else if(origBoard[2]!=="0"&&origBoard[2]!=="X")
            turn(2,aiPlayer);
            else
            turn(6,aiPlayer);
        }
    }
    //5th edge move comb
    else if(notsoimp===2&&(origBoard[1]==="0"&&origBoard[6]==="0"))
    {
       turn(0,aiPlayer);
    }
    //6th edge move comb
    else if(notsoimp===2&&(origBoard[1]==="0"&&origBoard[8]==="0"))
    {
        turn(2,aiPlayer);
    }
    //7th edge move comb
    else if(notsoimp===2&&(origBoard[2]==="0"&&origBoard[3]==="0"))
    {
        turn(0,aiPlayer);
    }
    //8th edge move comb
    else if(notsoimp===2&&(origBoard[3]==="0"&&origBoard[8]==="0"))
    {
        turn(6,aiPlayer);
    }
    //9th edge move comb
    else if(notsoimp===2&&(origBoard[0]==="0"&&origBoard[5]==="0"))
    {
        turn(2,aiPlayer);
    }
    //10th edge comb
    else if(notsoimp===2&&(origBoard[5]==="0"&&origBoard[6]==="0"))
    {
        turn(8,aiPlayer);
    }
    //11th edge move comb
    else if(notsoimp===2&&(origBoard[0]==="0"&&origBoard[7]==="0"))
    {
        turn(6,aiPlayer);
    }
    //12th edge move comb
    else if(notsoimp===2&&(origBoard[2]==="0"&&origBoard[7]==="0"))
    {
        turn(8,aiPlayer);
    }
    else if(notsoimp===2&&(origBoard[4]==="0")&&(origBoard[0]==="0"||origBoard[2]==="0"||origBoard[6]==="0"||origBoard[8]==="0"))
    {
        let here = Math.floor(Math.random()*2);
        if(origBoard[0]==="0")
        {
            if(here===0)
            {
                if(origBoard[2]!=="0"&&origBoard[2]!=="X")
                turn(2,aiPlayer);
                else
                turn(6,aiPlayer);
            }
            else
            {
                if(origBoard[6]!=="0"&&origBoard[6]!=="X")
                turn(6,aiPlayer);
                else
                turn(2,aiPlayer);
            }
        }
        else if(origBoard[2]==="0")
        {
            if(here===0)
            {
                if(origBoard[0]!=="0"&&origBoard[0]!=="X")
                turn(0,aiPlayer);
                else
                turn(8,aiPlayer);
            }
            else
            {
                if(origBoard[8]!=="0"&&origBoard[8]!=="X")
                turn(8,aiPlayer);
                else
                turn(0,aiPlayer);
            }
        }
        else if(origBoard[6]==="0")
        {
            if(here===0)
            {
                if(origBoard[0]!=="0"&&origBoard[0]!=="X")
                turn(0,aiPlayer);
                else
                turn(8,aiPlayer);
            }
            else
            {
                if(origBoard[8]!=="0"&&origBoard[8]!=="X")
                turn(8,aiPlayer);
                else
                turn(0,aiPlayer);
            }
        }
        else if(origBoard[8]==="0")
        {
            if(here===0)
            {
                if(origBoard[2]!=="0"&&origBoard[2]!=="X")
                turn(2,aiPlayer);
                else
                turn(6,aiPlayer);
            }
            else
            {
                if(origBoard[6]!=="0"&&origBoard[6]!=="X")
                turn(6,aiPlayer);
                else
                turn(2,aiPlayer);
            }
        }
    }
    else if(notsoimp===2&&((origBoard[0]==="0"&&origBoard[8]==="0")||(origBoard[2]==="0"&&origBoard[6]==="0")))
    {
        let count=1000;
        while(count--)
        {
            let x=Math.floor(Math.random()*9);
            //console.log(x);
            if(origBoard[x]==='X'||origBoard[x]==='0'||x===0||x===2||x===6||x===8)
            continue;
            else
            {
                //console.log("random");
                turn(x,aiPlayer);
                break;
            }
        } 
    }
    //no possible winning
    else 
    {
        let count=1000;
        while(count--)
        {
            let x=Math.floor(Math.random()*9);
            //console.log(x);
            if(origBoard[x]==='X'||origBoard[x]==='0')
            continue;
            else
            {
                //console.log("random");
                turn(x,aiPlayer);
                break;
            }
        } 
    }
}