const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

let delete_element = false;
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());


function getNotes() {
    return JSON.parse(localStorage.getItem("note-ap") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("note-ap", JSON.stringify(notes));
}
function createContainer() {
    const elementdiv = document.createElement("div");
    elementdiv.classList.add("note-container");
    return elementdiv;
}
function createNoteElement(id, content) {
    const element = document.createElement("div");
    element.classList.add("note");
    element.value = content;
    element.textContent = "Empty Note";
    element.setAttribute("contenteditable", "true")

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    element.addEventListener('click', (e) => {
        if (element.textContent == "Empty Note") {
            element.textContent = '';
        }
    });



    return element;
}
function createDeleteButton(id, element) {
    const elementDelete = document.createElement("button");
    elementDelete.classList.add("Delete_Button");
    const image = document.createElement("img");
    image.setAttribute("src", "assets/deleteIcon.png");
    image.setAttribute("alt", "Delete");

    elementDelete.appendChild(image);
    elementDelete.addEventListener("click", () => {
        deleteNote(id, element);
    })
    return elementDelete;
}
function createTextDecorationButtons(id, element) {
    const boldBtn = document.createElement("button");
    boldBtn.classList.add("btn");
    boldBtn.classList.add("boldBtn");
    boldBtn.textContent = "B";

    const underlineBtn = document.createElement("button");
    underlineBtn.classList.add("btn");
    underlineBtn.classList.add("underlineBtn");
    underlineBtn.textContent = "U";

    const italicBtn = document.createElement("button");
    italicBtn.classList.add("btn");
    italicBtn.classList.add("italicBtn");
    italicBtn.textContent = "I";

    boldBtn.addEventListener("click", () => {
        bold();
    })
    underlineBtn.addEventListener("click", () => {
        underline();
    })
    italicBtn.addEventListener("click", () => {
        italic();
    })
    return [boldBtn, underlineBtn, italicBtn];
}
function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    let note_conatiner = createContainer();
    notesContainer.insertBefore(note_conatiner, addNoteButton);
    const noteElement = createNoteElement(noteObj.id, noteObj.content);
    note_conatiner.appendChild(noteElement);
    const deleteButton = createDeleteButton(noteObj.id, note_conatiner);
    note_conatiner.appendChild(deleteButton);
    const decorateTextButtons = createTextDecorationButtons(noteObj.id, note_conatiner);
    decorateTextButtons.forEach(e => {
        note_conatiner.appendChild(e)
    });

    notes.push(noteObj);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const target = notes.filter(note => note.id == id)[0];

    target.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}
function bold() {
    var span = document.createElement("div");
    span.classList.add("bold");

    if (window.getSelection) {
        var text = window.getSelection();
        if (text.rangeCount) {
            var range = text.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            text.removeAllRanges();
            text.addRange(range);
        }
    }
}
function underline() {
    var span = document.createElement("div");
    span.classList.add("underline");

    if (window.getSelection) {
        var text = window.getSelection();
        if (text.rangeCount) {
            var range = text.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            text.removeAllRanges();
            text.addRange(range);
        }
    }
}
function italic() {
    var span = document.createElement("div");
    span.classList.add("italic");

    if (window.getSelection) {
        var text = window.getSelection();
        if (text.rangeCount) {
            var range = text.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            text.removeAllRanges();
            text.addRange(range);
        }
    }
}
document.addEventListener('keydown', (e) => {
    if (e.key == "b" && e.altKey) {
        bold();
    }
    else if (e.key == "u" && e.altKey) {
        underline();
    }
    else if (e.key == "i" && e.altKey) {
        italic();
    }
})