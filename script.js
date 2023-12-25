const bookLibrary = [];

// ---------- BOOK CONSTRUCTOR ----------------------------------------

function Book(title, author, pages, hasRead) {
    this.id = bookLibrary.length + 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.changeReadStatus = function() {
    if (this.hasRead === true) {
        this.hasRead = false;
    } else if (this.hasRead === false) {
        this.hasRead = true;
    }
}

// --------------------------------------------------------------------

const overlay = document.querySelector("#overlay");
const addBookForm = document.querySelector("#add-book-form");
const addBookButtons = document.querySelectorAll("[data-modal-target]");

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
    initReadStatusButtons();
});

addBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

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

        card.innerHTML = `
            <h3>${book.title}</h3>
            <h4>${book.author}</h4>
            <p>${book.pages} pages</p>
            <button class="read-status ${book.hasRead === true ? 'read' : 'not-read'}" data-book-id="${book.id}">${book.hasRead === true ? 'Read' : 'Not read'}</button>
            <button>Remove</button>`

        library.appendChild(card);
    });
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, +pages, hasRead);
    bookLibrary.push(book);
}

function initReadStatusButtons() {
    const readStatusButtons = document.querySelectorAll(".read-status");

    readStatusButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const btn = event.target;
            let book = bookLibrary.find(item => item.id == Number(btn.getAttribute("data-book-id")));
            
            if (btn.classList.contains("read") == true) {
                btn.textContent = "Not read";
                btn.classList.add("not-read");
                btn.classList.remove("read");
            } else if (btn.classList.contains("not-read") == true) {
                btn.textContent = "Read";
                btn.classList.add("read");
                btn.classList.remove("not-read");
            }

            book.changeReadStatus();
            console.log(book);
        });
    });
}

// ---------- FORM-RELATED FUNCTIONS ----------------------------------

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