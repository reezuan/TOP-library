const bookLibrary = [];

// ---------- BOOK CONSTRUCTOR ----------------------------------------

function Book(title, author, pages, hasRead) {
    this.id = bookLibrary.length + 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

// --------------------------------------------------------------------

const overlay = document.querySelector("#overlay");
const addBookForm = document.querySelector("#add-book-form");
const addBookButtons = document.querySelectorAll("[data-modal-target]");

addBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    });
});

addBookForm.addEventListener("submit", (event) => {
    let bookTitle = document.querySelector("#book-title");
    let bookAuthor = document.querySelector("#book-author");
    let bookPages = document.querySelector("#book-pages");
    let hasReadBook = document.querySelector("#has-read");

    event.preventDefault();

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, hasReadBook.checked);
    closeModal(addBookForm.closest(".modal"));
    addBookForm.reset();

    clearLibrary();
    populateLibrary();
});

function openModal(modal) {
    if (modal == null) {
        return;
    } else {
        modal.classList.add("active");
        overlay.classList.add("active");
    }
}

function closeModal(modal) {
    if (modal == null) {
        return;
    } else {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }
}

// ---------- LIBRARY-RELATED FUNCTIONS -------------------------------

function clearLibrary() {
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        card.remove();
    });
}

function populateLibrary() {
    bookLibrary.forEach(book => {
        const library = document.querySelector(".library");

        const card = document.createElement("div");
        card.classList.add("card");
        
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("h4");
        const bookPages = document.createElement("p");
        const hasReadButton = document.createElement("button");
        const removeButton = document.createElement("button");

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.pages} pages`;
        removeButton.textContent = "Remove";

        if (book.hasRead === true) {
            hasReadButton.textContent = "Read";
            hasReadButton.classList.add("read");
        } else {
            hasReadButton.textContent = "Not read";
            hasReadButton.classList.add("not-read");
        }

        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(hasReadButton);
        card.appendChild(removeButton);

        library.appendChild(card);
    });
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, +pages, hasRead);
    bookLibrary.push(book);
}

// ---------- FORM-RELATED FUNCTIONS ----------------------------------

// Modal has to go away
// Form has to be reset

