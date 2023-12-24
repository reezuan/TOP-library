const ketLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(book) {
    
}

function initialise() {
    const addBookButtons = document.querySelectorAll("[data-modal-target]");
    const overlay = document.querySelector("#overlay");

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
}

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

initialise();