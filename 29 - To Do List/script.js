// Array to store deleted tasks
var deletedTasks = [];

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName('LI');
for (var i = 0; i < myNodelist.length; i++) {
    appendButtons(myNodelist[i]);
}

// Function to append close and edit buttons to a list item
function appendButtons(li) {
    var division = document.createElement('div');
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    var editSpan = document.createElement('SPAN');
    editSpan.innerHTML = '&#9998';
    division.appendChild(span);
    division.appendChild(editSpan);
    editSpan.className = 'edit';
    editSpan.onclick = function () {
        editList(this);
    };
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(division);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName('close');
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement.parentElement;
        div.style.display = 'none';

        // Store the deleted task
        deletedTasks.push(div);
    };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    console.log('clicked on ' + ev.target.tagName);
    if (ev.target.tagName === 'DIV') {
        ev.target.parentElement.classList.toggle('checked');
    }
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('myInput').value;
    var inputTime = document.getElementById('time').value;
    var t = document.createTextNode(inputValue);
    if (inputValue === '') {
        alert('You must write something!');
        return;
    }
    li.appendChild(t);
    document.getElementById('myUL').appendChild(li);
    document.getElementById('myInput').value = '';
    document.getElementById('time').value = '';

    appendButtons(li);

    // Update close buttons click event
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement.parentElement;
            div.style.display = 'none';

            // Store the deleted task
            deletedTasks.push(div);
        };
    }

    // Get the current date and time
    var currentDate = new Date();
    var formattedDate = formatDate(currentDate);
    
    // Create and append date element
    var dateElement = document.createElement('span');
    dateElement.textContent = formattedDate;
    li.appendChild(dateElement);

    // Append time element if inputTime is provided
    if (inputTime) {
        var timeElement = document.createElement('span');
        timeElement.textContent = ' ' + inputTime;
        li.appendChild(timeElement);
    }
}

// Edit the list whenever the pencil icon is clicked
function editList(division) {
    var editButtons = document.getElementsByClassName('editBtn');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].style.display = 'none';
    }
    var item = division.parentElement.parentElement.firstElementChild;
    var inputDivision = document.getElementById('myInput');
    inputDivision.value = item.textContent;
    var addBtn = document.getElementsByClassName('addBtn')[0];
    addBtn.style.display = 'none';

    var myDiv = document.getElementById('myDIV');
    var editBtn = document.createElement('span');
    editBtn.innerHTML = 'Edit';
    editBtn.classList.add('editBtn');
    myDiv.appendChild(editBtn);

    editBtn.onclick = function () {
        item.textContent = inputDivision.value;
        inputDivision.value = '';
        editBtn.remove();
        addBtn.style.display = 'block';
    };
}

// Add a new element on Enter key press
document.getElementById('myInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        newElement();
    }
});
document.getElementById('myInput').value = '';

// Function to format the date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Function to view deleted tasks
function viewDeletedTasks() {
    var deletedList = document.getElementById('deletedTasks');
    deletedList.innerHTML = ''; // Clear the list first
    for (var i = 0; i < deletedTasks.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = deletedTasks[i].innerHTML;
        deletedList.appendChild(li);
    }
}
