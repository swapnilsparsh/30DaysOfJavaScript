let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

window.addEventListener('load', () => {
    let questionAnswersGiven =  sessionStorage.getItem("questionanswersGiven");
    id("result").innerHTML =  `${questionAnswersGiven}/5`;
    if(questionAnswersGiven<=2){
        id("feedback").innerHTML = "UGH!! you need improvement";
    }else if(questionAnswersGiven == 3){
        id("feedback").innerHTML = "You are almost there try again";
    }else{ 
        id("feedback").innerHTML = "Congratulations You made it";

    }
});