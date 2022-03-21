alert('Do you want to play the game?');

var randomNum1 = Math.floor(Math.random()*6)+1; // generate 1 to 6 random numbers
var randomImg= "img"+ randomNum1 + ".jpg"; // img1.jpg-img6.jpg
var randomImgSource= "image/" + randomImg; // image/imag1.jpg- image/ima6.jpg
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", randomImgSource);

var randomNum2 = Math.floor(Math.random()*6)+1;
var randomImgSource2= "image/img" + randomNum2 + ".jpg";
document.querySelectorAll("img")[1].setAttribute("src", randomImgSource2);

//player 1 wins
if (randomNum1 > randomNum2)
{
    document.querySelector("h1").innerHTML= "🚩 Player1 wins!";
}
//player2 wins
else if (randomNum2 > randomNum1)
{
    document.querySelector("h1").innerHTML= "🚩 Player2 wins!";
}
else{
    document.querySelector("h1").innerHTML = "Its a tie!";
}
