const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

let delete_element = false;
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());


function getNotes(){
    return JSON.parse(localStorage.getItem("note-ap") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("note-ap", JSON.stringify(notes));
}
function createContainer(){
    const elementdiv = document.createElement("div");
    elementdiv.classList.add("note-container");
    return elementdiv;
}
function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    
     

    return element;
}
function createDeleteButton(id,element){
    const elementDelete = document.createElement("button");
    elementDelete.classList.add("Delete_Button");
    const image = document.createElement("img");
    image.setAttribute("src", "reshot-icon-delete-KL8MB62NXD.png");
    image.setAttribute("alt","Delete");

    elementDelete.appendChild(image);
    elementDelete.addEventListener("click", () => {
        deleteNote(id,element);
    })
    return elementDelete;
}
function addNote(){
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: ""
    };
    let note_conatiner= createContainer();
    notesContainer.insertBefore(note_conatiner,addNoteButton);
    const noteElement = createNoteElement(noteObj.id, noteObj.content);
    note_conatiner.appendChild(noteElement);
    const deleteButton = createDeleteButton(noteObj.id,note_conatiner);
    note_conatiner.appendChild(deleteButton);

    notes.push(noteObj);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const target = notes.filter(note=>note.id == id)[0];

    target.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}



