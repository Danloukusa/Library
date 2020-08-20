let myLibrary = [];

// Constructor
function book(){
    let title = "", author = "", pageCount = "-1", readStatus = "unread", index = -1;
}

// don't put into constructor
book.prototype.info = function()
{
    let readOrNot = "unread";
    if(this.readStatus)
        readOrNot = "read";

    return(this.title + ", by " + this.author + ", " + this.pageCount + " pages, " + readOrNot);
}

function addToLibrary(object){
    myLibrary.push(object);
    object.id = myLibrary.length - 1;
}

// say I read a book
function readBook(){
    // Get ID of div, where book info is displayed.
    let divID = this.parentElement.id;
    // update readStatus with opposite
    myLibrary[divID].readStatus = !(myLibrary[divID].readStatus);
    if(myLibrary[divID].readStatus)
        document.getElementById("read" + divID).innerText = "Haven't read this book"
    else
        document.getElementById("read" + divID).innerText = "Have read this book"

    let readButton = document.getElementById("read" + divID);
    // Delete the "have read this book" button


    // update the information in the display
    let button = document.getElementById("del" + divID);
    document.getElementById(divID).innerText = myLibrary[divID].info();
    // I deleted the button by overwriting with innerText
    // pasting the button back, which I copied before.
    document.getElementById(divID).appendChild(button);
    document.getElementById(divID).appendChild(readButton);

    // now the bookInfo is first child. Change that to new info.
    // myLibrary[divID].info();"
}

// DELETE a book from LIBRARY
function deleteBook(){
    // Get ID of div, where book info is displayed.
    let divID = this.parentElement.id;
    // Only one book in lib, VS multiple in lib
    if(myLibrary.length < 2)
        myLibrary.pop();
    else
        myLibrary = myLibrary.splice(divID, 1);

    let gallows = document.getElementById(divID);
    gallows.remove();
}

function showBook(book){
    let zeDom = document.createElement("div");
    zeDom.className = "Book";
    zeDom.innerText = book.info();
    zeDom.id = book.id;

    // in a table
    // OR

    // each own card
    document.getElementById("library").appendChild(zeDom);

    // add READ BUTTON

    // IF and ONLY IF, book is unread!

    let readButton = document.createElement("button");
    if(!(book.readStatus))
        readButton.innerText = "Have read this book";
    else
        readButton.innerText = "Haven't read this book";    
    readButton.className = "readButton";
    readButton.id = "read" + book.id;
    readButton.addEventListener("click", readBook);
    document.getElementById(book.id).appendChild(readButton);

    // add DELETE BUTTON

    let delButton = document.createElement("button");
    delButton.innerText = "Delete Book";
    delButton.className = "deleteButton";
    delButton.id = "del" + book.id;
    delButton.addEventListener("click", deleteBook);
    document.getElementById(book.id).appendChild(delButton);

}

function addEventListener(){
    let newBook = document.getElementById("newBook");
    newBook.addEventListener("click", showForm);

    let submit = document.getElementById("submit");
    submit.addEventListener("click", createBook);
}

// Change FORM invisible to visible
function showForm(){
    document.getElementById("bookInfo").style.display = "block";
}

// EMPTY FORM, HIDE FORM
function clearForm(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageCount").value = "";
    document.getElementById("bookInfo").style.display = "none";
}

// FETCH information from FORM
function createBook(){
    let myBook = new book();
    myBook.title = document.getElementById("title").value;
    myBook.author = document.getElementById("author").value;
    myBook.pageCount = document.getElementById("pageCount").value;
    myBook.readStatus = document.getElementById("read").checked;
    addToLibrary(myBook);
    clearForm();
    showBook(myBook);
}

addEventListener();
