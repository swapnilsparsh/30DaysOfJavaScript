const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const deleteNoteButton = notesContainer.querySelector("#delete-note")
let delete_element = false;
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, deleteNoteButton);
});

addNoteButton.addEventListener("click", () =>{ 
    if(delete_element){
        deleteNoteButton.innerHTML='Delete';
        document.getElementById("delete-note").style.background=' rgba(255, 0, 0, 0.35) ';
        
        delete_element=false;
    }
    addNote()});
deleteNoteButton.addEventListener("click",() => {
    if(!delete_element){
    deleteNoteButton.innerHTML= '<img src="reshot-icon-delete-KL8MB62NXD.png" alt="delete">';
    document.getElementById("delete-note").style.background=' rgba(255, 0, 0, 0.693) ';
        delete_element=true;

}
else{
    deleteNoteButton.innerHTML='Delete';
    document.getElementById("delete-note").style.background=' rgba(255, 0, 0, 0.35) ';
    
    delete_element=false;
}
});

function getNotes(){
    return JSON.parse(localStorage.getItem("note-ap") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("note-ap", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    
     element.addEventListener("click", () => {
         if(delete_element){
            deleteNote(id,element);
         }
     });

     //Removed the double click method of deleting

    // element.addEventListener("dblclick", () => {
    //     const noteDelete = confirm("Want to Delete the note?")
    //     if (noteDelete) {
    //         deleteNote(id, element);
    //     }
    // });

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObj.id, noteObj.content);
    notesContainer.insertBefore(noteElement, deleteNoteButton);


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



