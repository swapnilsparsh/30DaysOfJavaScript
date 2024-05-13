let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let queryselector = (query) => document.querySelector(query);

let questionNumber = 0, quiztimer, questionTimer;
let questionAnswersGiven = 0;

// for converting b64 to utf8
function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

// to check answer
let checkAnswer = (answerGiven, rightAnswer, options) => {

    if (answerGiven === b64_to_utf8(rightAnswer)) {
        id(answerGiven).style.background = "#228B22";
        id(answerGiven).style.color = "#fff";
        questionAnswersGiven++;
    } else {
        if (answerGiven) {
            id(answerGiven).style.background = "#FA8072";
            id(answerGiven).style.color = "#fff";

        }

        options.map(option => {
            if (option === b64_to_utf8(rightAnswer)) {
                try {

                    id(option).style.background = "#32CD32";
                    id(option).style.color = "#fff";
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
}


// redering data of question
let renderQuestion = (questionDetail) => {
    id("question").innerHTML = questionDetail.question;
    let radioOption = id("radio-options");
    radioOption.innerHTML = "";

    // rendering radio option
    questionDetail.options.map((option) => {
        let Div = document.createElement("div")
        Div.setAttribute("id", option);
        let RadioButton = document.createElement("input");
        RadioButton.setAttribute("type", "radio");
        RadioButton.setAttribute("name", "answer");
        RadioButton.setAttribute("value", option);
        RadioButton.setAttribute("class", "form-check-input");

        let Label = document.createElement("label");
        Label.innerHTML = option;
        Label.setAttribute("class", "form-check-label");

        Div.appendChild(RadioButton);
        Div.appendChild(Label);
        radioOption.appendChild(Div);

    });

}

// displaying initial data
let displayInitialData = (quizChosen) => {
    id("quiz-title").innerHTML = quizChosen.title;
    let updateCreatedAt = () => {
        let currentDate = new Date();
        id("created-at").innerHTML = currentDate;
    };
    updateCreatedAt();
    setInterval(updateCreatedAt, 999);
    id("quiz-time").innerHTML = `1. Max time to solve quiz is ${quizChosen.totalTime} sec`;
    id("drop-down-quiz-time").innerHTML = `1. Max time to solve quiz is ${quizChosen.totalTime} sec`;
    id("question-time").innerHTML = `2. Max time to solve one question is ${quizChosen.timePerQuestion} sec`;
    id("drop-down-question-time").innerHTML = `2. Max time to solve one question is ${quizChosen.timePerQuestion} sec`

    classes("container-box")[0].style.display = "flex";


    let remainingtimeForQuiz = quizChosen.totalTime;

    // timmer for quiz
    let checkTimeForQuiz = () => {
        if (remainingtimeForQuiz === 0) {

            if (questionNumber < quizChosen.data.length) {

                let answerGiven = queryselector("input[name='answer']:checked");
                if (answerGiven) {
                    answerGiven = answerGiven.value;
                }
                checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);

            }

            console.log(questionAnswersGiven);
            sessionStorage.setItem("questionanswersGiven", questionAnswersGiven);
            window.location = "result.html";
        } else {
            remainingtimeForQuiz--;
            id("quiz-time-left").innerHTML = remainingtimeForQuiz;
            quiztimer = setTimeout(checkTimeForQuiz, 1000);
        }
    }

    let remainingTimeForQuestion = quizChosen.timePerQuestion;

    // timmer for question
    let checkTimeforQuestion = () => {
        if (remainingTimeForQuestion === 0) {
            let answerGiven = queryselector("input[name='answer']:checked");
            if (answerGiven) {
                answerGiven = answerGiven.value;
            }
            if (questionNumber < quizChosen.data.length - 1) {
                remainingTimeForQuestion = quizChosen.timePerQuestion;
            }

            checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
            classes("submit")[0].classList.add("disabled");
            classes("next")[0].classList.remove("disabled");
            questionNumber++;

        } else {

            id("question-time-left").innerHTML = remainingTimeForQuestion;
            remainingTimeForQuestion--;
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            questionTimer = setTimeout(checkTimeforQuestion, 1000);
        }
    }

    classes("start-quiz")[0].addEventListener("click", () => {

        renderQuestion(quizChosen.data[questionNumber]);
        id("rules-box").style.display = "none";
        id("question-box").style.display = "block";

        id("quiz-time-left").innerHTML = remainingtimeForQuiz;
        quiztimer = setTimeout(checkTimeForQuiz, 1000);

        id("question-time-left").innerHTML = remainingTimeForQuestion;
        questionTimer = setTimeout(checkTimeforQuestion, 1000);
    });


    classes("next")[0].addEventListener("click", () => {
        if (questionNumber >= quizChosen.data.length) {
            clearInterval(quiztimer);
            console.log(questionAnswersGiven);
            sessionStorage.setItem("questionanswersGiven", questionAnswersGiven);
            window.location = "result.html";
        } else if (questionNumber === (quizChosen.data.length - 1)) {
            classes("next")[0].innerHTML = "Show Result";
            renderQuestion(quizChosen.data[questionNumber]);
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            quiztimer = setTimeout(checkTimeforQuestion, 1000);
            classes("next")[0].classList.add("disabled");
            classes("submit")[0].classList.remove("disabled");

        } else {
            renderQuestion(quizChosen.data[questionNumber]);
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            quiztimer = setTimeout(checkTimeforQuestion, 1000);
            classes("next")[0].classList.add("disabled");
            classes("submit")[0].classList.remove("disabled");

        }
    });

    classes("submit")[0].addEventListener("click", () => {
        let answerGiven = queryselector("input[name='answer']:checked");
        if (answerGiven) {
            answerGiven = answerGiven.value;
        }
        clearInterval(questionTimer);
        remainingTimeForQuestion = quizChosen.timePerQuestion;
        checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
        questionNumber++;

        classes("submit")[0].classList.add("disabled");
        classes("next")[0].classList.remove("disabled");

    });
}




window.addEventListener('load', () => {
    // reading parameters
    const params = (new URL(document.location)).searchParams;
    const quizChosen = params.get('quiz');
    // eval --> converting string to variable
    displayInitialData(eval(quizChosen));
});