//setting up variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasksMsg = document.querySelector(".no-tasks-message");
let tasksCount = document.querySelector(".tasks-count span ");
let tasksCompleted = document.querySelector(".tasks-completed span");
let count=0;
let finished=0;

//focus in the input field
window.onload = function () {
  theInput.focus();
};

//adding the task
theAddButton.onclick = function () {
  //if input is empty
  if (theInput.value === "") {
    //create sweet alert
    alert("You should add a task");
  } else {
    //remove no tasks message
    noTasksMsg.remove();

    //create span element
    let mainSpan = document.createElement("span");
    count++;

    //create delete button
    let deleteElement = document.createElement("span");

    //create span text
    let text = document.createTextNode(theInput.value);

    //crete delete button text
    let deleteText = document.createTextNode("Delete");

    //add text to span
    mainSpan.appendChild(text);

    //add class to span
    mainSpan.className = "task-box";

    //add text to delete button
    deleteElement.appendChild(deleteText);

    //add class to delete button
    deleteElement.className = "delete";

    //add delete button to main span
    mainSpan.appendChild(deleteElement);

    //add the task to the container
    tasksContainer.appendChild(mainSpan);

    //empty the input
    theInput.value = "";

    //focus on field
    theInput.focus();
    
    tasksCount.textContent=count;
    tasksCompleted.textContent=finished;
  }
};
document.addEventListener("click", function (e) {
  //delete task
  if (e.target.className == "delete") {
    count--;
    if(!e.target.classList.contains('finished')){
      finished--;
    }
    e.target.parentNode.remove();
  }
  //finish task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    if(e.target.classList.contains('finished')){
    	finished++;
    }else{
    	finished--;
    }
  }
  tasksCount.textContent=count;
    tasksCompleted.textContent=finished;
});
