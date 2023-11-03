let colorOne = document.getElementById('color_one');
let colorTwo = document.getElementById('color_two');
let currentdir = "to top";
let outputcode = document.getElementById('code');

function setdirection(value, _this) {
    let direction = document.querySelectorAll('.buttons button');
    direction.forEach(e => {
        e.classList.remove('active');
    });
    _this.classList.add('active');
    currentdir = value;
}
function generate() {
    outputcode.value = `background-image: linear-gradient(${currentdir}, ${colorOne.value}, ${colorTwo.value});`;
    document.getElementById('body').style.backgroundImage = `linear-gradient(${currentdir}, ${colorOne.value}, ${colorTwo.value})`;
}
function copy(e) {
    e.preventDefault();
    outputcode.select();
    alert("Code copied to clipboard!");

}