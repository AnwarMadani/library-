let myLibrary = [];
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

function removeBookFromLibrary(title){
    myLibrary = myLibrary.filter(book => book.title !== title)
}

function getBook(title){
    return myLibrary.find(book => book.title === title);
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

    readBtn.addEventListener("click", (e) => toggleRead(e));

    deleteBtn.addEventListener("click", (e) => removeBook(e));

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

addBookSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(!addBookForm.checkValidity()){
        addBookForm.reportValidity();
        return;
    }
    addBook(e);
});

function addBook(e){
    e.preventDefault();
    const newBook = createBook();
    addBookToLibrary(newBook);
    updateBooksContainer();
    closeAddBookModal();
}

function removeBook(e){
    const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;

    removeBookFromLibrary(title);
    updateBooksContainer();
}

function toggleRead(e){
    const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;
    
    const book = getBook(title);
    book.read = !book.read;
    updateBooksContainer();
}

// FORM VALIDATION

const titleInput = document.getElementById('titleInput');

titleInput.addEventListener("input", (e) => {
    if(titleInput.validity.valueMissing){
        titleInput.setCustomValidity("Please enter a title!")
    } else if(titleInput.validity.tooLong){
        titleInput.setCustomValidity("The title provided is too long! Please don't exceed 100 characters.")
    } else if(titleInput.validity.tooShort){
        titleInput.setCustomValidity("Title must be longer than 5 letters.");
    } else {
        titleInput.setCustomValidity("")
    }
});

const authorInput = document.getElementById('authorInput');

authorInput.addEventListener("input", (e) => {
    if(authorInput.validity.valueMissing){
        authorInput.setCustomValidity("Please enter an Author!")
    } else if(authorInput.validity.tooLong){
        authorInput.setCustomValidity("The name provided is too long! Please don't exceed 100 characters.")
    } else if(authorInput.validity.tooShort){
        authorInput.setCustomValidity("Author's name must be longer than 5 letters.");
    } else {
        authorInput.setCustomValidity("")
    }
});


const pagesInput = document.getElementById('pagesInput');

pagesInput.addEventListener("input", (e) => {
    if(pagesInput.validity.valueMissing){
        pagesInput.setCustomValidity("Please enter the number of pages!")
    } else if(pagesInput.validity.rangeOverflow){
        pagesInput.setCustomValidity("The number of pages must be below 10000")
    } else if(pagesInput.validity.rangeUnderflow){
        pagesInput.setCustomValidity("The number of pages must be atleast 10");
    } else {
        pagesInput.setCustomValidity("")
    }
});