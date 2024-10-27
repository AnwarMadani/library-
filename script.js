const myLibrary = [];

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
