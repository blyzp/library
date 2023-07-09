/* Variables */

// Array
let myLibrary = [];

// Form
const btnNew  = document.getElementById("btnNew");
const form  = document.getElementsByTagName("form")[0];
const title = document.getElementById("booktitle");
const author = document.getElementById("bookauthor");
const pages = document.getElementById("bookpages");
const read = document.getElementsByName("bookread");

// Error messages
const errorTitle = document.querySelector(".error-title");
const errorAuthor = document.querySelector(".error-author");
const errorPages = document.querySelector(".error-pages");

// Containers
const boxNewOut = document.getElementById("boxNewOut");
const boxNew = document.getElementById("boxNew");
const boxShow = document.getElementById("boxShow");



/* Functions */

btnNew.addEventListener("click", (e) => {
    boxNewOut.style.display = "block";
    boxNew.style.display = "block";
});


btnClose.addEventListener("click", (e) => {
    clearForm();
});


form.addEventListener("submit", (e) => {
    let valTitle, valAuthor, valPages, valRead;

    // Validate
    if (!title.value || !/\S/.test(title.value)) {
        title.classList.add("error");
        errorTitle.textContent = "* Enter a title";
        e.preventDefault();
    } else {
       title.classList.remove("error");
        errorTitle.textContent = "";
        valTitle = title.value;
    }
    
    if (!author.value || !/\S/.test(author.value)) {
        author.classList.add("error");
        errorAuthor.textContent = "* Enter an author";
        e.preventDefault();
    } else {
        author.classList.remove("error");
        errorAuthor.textContent = "";
        valAuthor = author.value;
    }

    if (!pages.value) {
        pages.classList.add("error");
        errorPages.textContent = "* Enter number of pages";
        e.preventDefault();
    } else if (pages.value.includes(" ") || isNaN(pages.value) == true) {
        pages.classList.add("error");
        errorPages.textContent = "* Enter numberic characters";
        e.preventDefault();
    } else {
        pages.classList.remove("error");
        errorPages.textContent = "";
        valPages = pages.value;
    }

    // Get radio button value
    read.forEach((e) => {
        if (e.checked) {
            valRead = e.value;
        }
    });

    // Add book
    if (valTitle && valAuthor && valPages) {
        addBookToLibrary(valTitle, valAuthor, valPages, valRead);
        showBook();
        clearForm();
    }
});


function clearForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    boxNewOut.style.display = "none";
    boxNew.style.display = "none";
}


function Book(title, author, pages, read) {
    this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}


function addBookToLibrary(title, author, pages, read) {
	let myBook = new Book(title, author, pages, read);
  	myLibrary.push(myBook);
}


function showBook() {
        const index = myLibrary.length - 1;
        const boxBook = document.createElement("div");
        boxBook.classList.add("boxBook");
        boxBook.innerHTML = `<div class="boxBookTop"><button class="btnDel">&#10006;</button></div>
        <div class="boxBookMid"><span class="bookTitle">${myLibrary[index].title}</span>
        <span class="bookText">${myLibrary[index].author}</span>
        <span class="bookText">${myLibrary[index].pages} p.</span></div>
        <div class="boxBookBot"><button class="btnRead">${myLibrary[index].read}</button></div>`;
        boxShow.appendChild(boxBook);

        const btnRead = Array.from(document.getElementsByClassName("btnRead"));        
        if (myLibrary[index].read == "Read") {
            btnRead[index].innerHTML = `<i class="fa-solid fa-bookmark"></i> Read`;
            btnRead[index].style.color = "#9c7878";
        } else {            
            btnRead[index].innerHTML = `<i class="fa-regular fa-bookmark"></i> Unread`;
            btnRead[index].style.color = "#999";
        }
}


document.addEventListener("click", (e) => {
    // Delete book
    if (e.target.className == "btnDel") {
        const index = Array.from(document.getElementsByClassName("btnDel")).indexOf(e.target);
        const books = Array.from(document.getElementsByClassName("boxBook"));
        myLibrary.splice(index, 1);
        books[index].remove();
    }
    
    // Change read status
        if (e.target.className == "btnRead") {
            const btnRead = document.getElementsByClassName("btnRead");
            const index = Array.from(btnRead).indexOf(e.target);
            if (myLibrary[index].read == "Read") {
                myLibrary[index].read = "Unread";
                btnRead[index].innerHTML = `<i class="fa-regular fa-bookmark"></i> Unread`;
                btnRead[index].style.color = "#999";
            } else {
                myLibrary[index].read = "Read";
                btnRead[index].innerHTML = `<i class="fa-solid fa-bookmark"></i> Read`;
                btnRead[index].style.color = "#9c7878";
            }
        }
});