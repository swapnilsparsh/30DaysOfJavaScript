let btn = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".newbtn");
let msg = document.querySelector(".msg");
let message = document.querySelector("#message");
let turn = document.querySelector(".turn");
let turnO = "true";
let count = 0;
const winpatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],
];
btn.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === "true" ) {
            box.innerText = "O";
            box.style.backgroundColor = "#A3EBB1";
            turnO = "false";
            turn.innerText = "Turn of X";
        }
        else {
            box.innerText = "X";
            box.style.backgroundColor = "#D4F1F4";
            turnO = "true";
            turn.innerText = "Turn of O";
        }
        count++;
        box.disabled = true;
        checkWinner();
        let iswinner = checkWinner();
        if (count === 9 && !iswinner)
            showDraw();
    });
});
const disable = () => {
    for (let box of btn) {
        box.disabled = true;
    }
};
const enable = () => {
    for (let box of btn) {
        box.disabled = false;
        box.innerText = "";
        msg.classList.add("hide");
        box.style.opacity = 1;
        box.style.backgroundColor = "#FCB5AC";
    }
};
const showWinner = (winner) => {
    message.innerText = `Congratulations! Winner is ${winner}`;
    msg.classList.remove("hide");
    disable();
};
const showDraw = () => {
    message.innerText = "Game is draw.";
    msg.classList.remove("hide");
    disable();
};
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let val1 = btn[pattern[0]].innerText;
        let val2 = btn[pattern[1]].innerText;
        let val3 = btn[pattern[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val3 === val2) {
                btn[pattern[0]].style.opacity = 0.5;
                btn[pattern[1]].style.opacity = 0.5;
                btn[pattern[2]].style.opacity = 0.5;
                showWinner(val1);
                return val1;
            }
        }
    }
};
const reset = () => {
    turnO = "true";
    turn.innerText = "Turn of O";
    count = 0;
    enable();
}
newbtn.addEventListener("click", reset);
resetbtn.addEventListener("click", reset);
