displayNotes(); //As the browser open it show all the stored books

let libraryForm = document.getElementById('libraryForm');

libraryForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let science = document.getElementById('science');
    let type;



    if (fiction.checked) {
        type = fiction.value;
        programming.unchecked;
        science.unchecked;
    }
    else if (programming.checked) {
        type = programming.value;
        science.unchecked;
        fiction.unchecked;
    }
    else if (science.checked) {
        type = science.value;
        fiction.unchecked;
        programming.unchecked;
    }


    let shelf = localStorage.getItem('shelfOfBooks');
    let objOfBook; //object which stores books

    if (shelf == null) {
        objOfBook = [];
    }
    else {                                //We might have multiple books 
        objOfBook = JSON.parse(shelf);   //By using JSON we convert it into Object
    }

    if (name == "") {
        errorMessage();
    }
    else {
        let myObj = {
            book: name,
            bookauthor: author,
            bookType: type
        }
        objOfBook.push(myObj);
        addMessage();
    }

    localStorage.setItem('shelfOfBooks', JSON.stringify(objOfBook));

    name = "";
    author = "";
    type.value = "";

    displayNotes();
})


//Function to show elements(books) from LocalStorage
function displayNotes() {
    let books = localStorage.getItem('shelfOfBooks');
    let objOfBook;

    if (books == null) {
        objOfBook = [];
    }
    else {
        objOfBook = JSON.parse(books);
    }

    let html = "";
    let index = 1;

    objOfBook.forEach(function (books) {  //index is the length of the array

        html += `
    <tr class="rows">
    <th scope="row">${index++}</th>
    <td class="name">${books.book}</td>
    <td>${books.bookauthor}</td>
    <td>${books.bookType}</td>
    </tr>
        `;
    });

    let table = document.getElementById('tableBody');

    if (objOfBook.length != 0) {
        table.innerHTML = html;
    }
    else {
        table.innerHTML = `Nothing to show! Use "Add book" above to add books`
    }

    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}


//Show adding message
function addMessage() {
    let message = document.getElementById('message');

    message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Message:</strong> Your book has been successfully added.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

    setTimeout(() => {
        message.innerHTML = ``;
    }, 10000);
}

//Show error message
function errorMessage() {
    let message = document.getElementById('message');

    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error:</strong> To add book, add name of book.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

    setTimeout(() => {
        message.innerHTML = ``;
    }, 5000);
}

//Searching book by bookname
let searchNote = document.getElementById('searchText');
searchNote.addEventListener('input', function () {

    let search = searchNote.value.toLowerCase();
      
    let tableRows = document.getElementsByClassName('rows');

    Array.from(tableRows).forEach(function (element) {

        let bookName = element.getElementsByClassName("name")[0].innerText.toLowerCase();

        if (bookName.includes(search)) {
            element.style.display = "table-row";
        }
        else {
            element.style.display = "none";
        }
    })

});