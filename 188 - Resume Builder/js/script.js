// taking elements from html
// input form
const inputField = document.querySelector('.inputField');
// unput container
const main = document.querySelector('.main');
// output container
const output_container = document.querySelector('.output_container');

// to track hide element
let hideElement=true;

// function to hide the element on button click
function hide(){

    // when input page is visible
    if(hideElement){
        // hide input container
        main.style.display="none";
        hideElement=false;

        // dispaly preview container
        output_container.style.display="block";
        // inner html for preview container
        output_container.innerHTML=`
        <div class="output">
        <div class="heading">
        <h1>${inputField["name"].value}</h1>
        <h4>${inputField["title"].value}</h4>
        </div>
        <div class="info">
        <div class="left">
        <div class="box">
        <h2>Objective</h2>
        <p>${inputField["objective"].value}</p>
        </div>
        <div class="box">
        <h2>Skills</h2>
        <p>${inputField["skills"].value}</p>
        </div>
        <div class="box">
        <h2>Acedemic Details</h2>
        <p>${inputField["academic_details"].value}</p>
        </div>
        <div class="box">
        <h2>contact</h2>
        <p>${inputField["contact"].value}</p>
        </div>
        </div>
        <div class="right">
        <div class="box">
        <h2>Work Experience</h2>
        <p>${inputField["work_experience"].value}</p>
        </div>
        <div class="box">
        <h2>Achievements</h2>
        <p>${inputField["achievements"].value}</p>
        </div>
        <div class="box">
        <h2>Projects</h2>
        <p>${inputField["projects"].value}</p>
        </div>
        </div>
        </div>
        </div>
        <button onclick="print()">Print Resume</button>
        `
    }

    // show input container
    else
    {   
        // display input container
        main.style.display="block";
        hideElement=true;

        // hide preview container
        output_container.style.display="none";
        output_container.innerHTML="";
    }
}
// end of hide() function