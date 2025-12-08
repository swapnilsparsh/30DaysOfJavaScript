// Check if list is empty
function updateEmptyMessage() {
  const list = document.getElementById("myUL");
  const message = document.getElementById("emptyMessage");
  message.style.display = list.children.length === 0 ? "block" : "none";
}

// Attach close and edit buttons
function attachCloseAndEdit(li) {
  var division = document.createElement("div");

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  var editSpan = document.createElement("SPAN");
  editSpan.innerHTML = "&#9998";

  division.appendChild(span);
  division.appendChild(editSpan);

  editSpan.className = "edit";
  editSpan.onclick = function () {
    editList(this);
  };

  span.className = "close";
  span.appendChild(txt);
  li.appendChild(division);

  span.onclick = function () {
    this.parentElement.parentElement.remove();
    updateEmptyMessage();
  };
}

// Mark checked
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "DIV") {
      ev.target.parentElement.classList.toggle("checked");
    }
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Add item
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (!inputValue) {
    alert("You must write something!");
    return;
  }

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(inputValue));
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  attachCloseAndEdit(li);

  // Date
  var dateElement = document.createElement("span");
  dateElement.textContent = formatDate(new Date());
  li.appendChild(dateElement);

  updateEmptyMessage();
}

// Edit item
function editList(division) {
  var item = division.parentElement.parentElement.firstChild;
  var inputDivision = document.getElementById("myInput");
  inputDivision.value = item.textContent;

  var addBtn = document.getElementsByClassName("addBtn")[0];
  addBtn.style.display = "none";

  var myDiv = document.getElementById("myDIV");
  var editBtn = document.createElement("span");
  editBtn.innerHTML = "Edit";
  editBtn.classList.add("editBtn");
  myDiv.appendChild(editBtn);

  editBtn.onclick = function () {
    item.textContent = inputDivision.value;
    inputDivision.value = "";
    editBtn.remove();
    addBtn.style.display = "inline-block";
  };
}

// Enter key
document.getElementById("myInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") newElement();
});

// Format date
function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

updateEmptyMessage();
