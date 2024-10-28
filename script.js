const myLibrary = [];
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const booksContainer = document.getElementById('booksContainer');
const addBookForm = document.getElementById('addBookForm');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let readOrNot = 'not read yet'
        if(this.read){
            readOrNot = 'read'
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readOrNot}`
    }
}

function addBookToLibrary(newBook){
    if(!myLibrary.includes(newBook)){
        myLibrary.push(newBook);
    }
}

function removeBook(title){
    myLibrary = myLibrary.filter(book => book.title !== title)
}

addBookBtn.addEventListener("click", openAddBookModal);
overlay.addEventListener("click", closeAddBookModal);

function openAddBookModal(){
    addBookForm.reset();
    addBookModal.classList.add('active');
    overlay.classList.add('active');
}

function closeAddBookModal(){
    addBookModal.classList.remove('active');
    overlay.classList.remove('active');
}