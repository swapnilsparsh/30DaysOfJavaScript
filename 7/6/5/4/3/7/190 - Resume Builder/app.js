
const inputfields = document.querySelector("#getData");
const resume = document.getElementById("resume");
let inputshow = true;
const pdff=document.getElementById("submit");

function showdiv() {
  resume.innerHTML = `<h1 align="center">${
    inputfields[(id = "name")].value
  }</h1 ><br>
    <h2 align="center">${inputfields[(id = "jobProfile")].value}</h2><br><hr>
    <h3 align="left">Experience : </h3>
        <p align="left">${inputfields[(id = "experience")].value}</p>
    <h3 align="left">Projects : </h3>
        <p align="left">${inputfields[(id = "projects")].value}</p>
    <h3 align="left">Education : </h3>
        <p align="left">${inputfields[(id = "edu")].value}</p>
    <h3 align="left">Skills : </h3>
        <p align="left">${inputfields[(id = "skill")].value}</p>
    <h3 align="left">Contact Details : </h3>
        <p align="left"><strong>Contact number : </strong>${inputfields[(id = "contact")].value}<br>
        <strong>Email ID : </strong>${inputfields[(id = "mail")].value}</p>`;
}

function toggle() {
  if (inputshow === true) {
    inputfields.style.display = "none";
    inputshow = false;
    document.getElementById("generate").value = "Edit";
    resume.style.display = "block";
    pdff.style.display = "block";
  } else {
    inputfields.style.display = "block";
    inputshow = true;
    document.getElementById("generate").value = "Preview";
    resume.style.display = "none";
    pdff.style.display = "none";
  }
  showdiv();
}
var doc = new jsPDF();
var specialElementHandlers = {
    '#print-btn': function (element, renderer) {
        return true;
    }
};

$('#submit').click(function () {
    doc.fromHTML($('#resume').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('pdf-version.pdf');
});
 
