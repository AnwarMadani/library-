const myLibrary = [];
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const booksContainer = document.getElementById('booksContainer');
const addBookForm = document.getElementById('addBookForm');
const addBookSubmitBtn = document.getElementById('submit');

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

// GOOD

function updateBooksContainer(){
    booksContainer.innerHTML = '';
    for(let book of myLibrary){
        createBookCard(book);
    }
}

function createBookCard(book){
    const bookCard = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h3');
    const pages = document.createElement('h3');
    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    bookCard.classList.add('book');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');
    deleteBtn.classList.add('delete');

    // readBtn.addEventListener("click", toggleRead);

    // deleteBtn.addEventListener("click", removeBook);

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} pages`;
    deleteBtn.textContent = 'Delete';


    if(book.read){
        readBtn.textContent = 'Read';
        readBtn.classList.add('read');
    } else {
        readBtn.textContent = 'Not Read';
        readBtn.classList.add('notread');
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(deleteBtn);
    booksContainer.appendChild(bookCard);
}

function createBook(){
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const pages = document.getElementById('pagesInput').value;
    const isRead = document.getElementById('is-read').checked;
    return new Book(title, author, pages, isRead);
}

addBookSubmitBtn.addEventListener("click", (e) => addBook(e));

function addBook(e){
    e.preventDefault();
    const newBook = createBook();
    addBookToLibrary(newBook);
    updateBooksContainer();
    closeAddBookModal();
}