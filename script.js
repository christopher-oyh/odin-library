const myLibrary = [];

function Book(title, author, pages, read, rating) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
  this.rating = rating;
}

function addBookToLibrary(book, library) {
  library.push(book);
  displayBook(book, library.length);
}

function displayBook(book, index) {
  const newBook = document.createElement("div");
  newBook.classList.add("book", "card");
  newBook.dataset.indexNumber = index;

  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = `"${book.title}"`;
  newBook.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  const emphasizeAuthor = document.createElement("em");
  emphasizeAuthor.textContent = book.author;
  bookAuthor.appendChild(emphasizeAuthor);
  newBook.appendChild(bookAuthor);

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `${book.pages} pages`;
  newBook.appendChild(pages);

  const rating = document.createElement("p");
  rating.classList.add("rating");
  rating.textContent = `${book.rating} stars`;
  newBook.appendChild(rating);

  const readStatus = document.createElement("button");
  readStatus.classList.add("read-status");
  if (book.isRead) {
    readStatus.classList.add("read");
    readStatus.textContent = "Read";
  } else {
    readStatus.textContent = "Not read";
  }
  readStatus.value = "read-status";
  newBook.appendChild(readStatus);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-book");
  removeButton.textContent = "Remove";
  removeButton.value = "remove-book";
  newBook.appendChild(removeButton);

  const books = document.querySelector(".books");
  books.appendChild(newBook);
}

function displayBooklist(library) {
  for (let i = 0; i < library.length; i++) {
    displayBook(library[i], i);
  }
}

// Dummy books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true, 5);
const book2 = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  423,
  false,
  4
);

const book3 = new Book("The Two Towers", "J.R.R. Tolkien", 352, false, 3);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
displayBooklist(myLibrary);

const addBookBtn = document.querySelector("#add-book");
const dialog = document.querySelector("#add-book-dialog");
const confirmAddBookButton = document.querySelector("#confirm-dialog");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmAddBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#new-book-title").value;
  const author = document.querySelector("#new-book-author").value;
  const pages = document.querySelector("#new-book-pages").value;
  const rating = document.querySelector("#new-book-rating").value;
  const read = document.querySelector("#new-book-read").checked;

  const newBook = new Book(title, author, pages, read, rating);
  addBookToLibrary(newBook, myLibrary);

  //   Reset form
  //   const form = document.querySelector("form");
  //   form.reset();

  dialog.close();
});

const books = document.querySelector(".books");
books.addEventListener("click", (event) => {
  const target = event.target;
  const targetBookIndex = target.parentNode.dataset.indexNumber;

  if (target.tagName !== "BUTTON") return;

  switch (target.value) {
    case "read-status":
      target.classList.toggle("read");
      if (target.classList.contains("read")) {
        target.textContent = "Read";
        myLibrary[targetBookIndex].isRead = true;
      } else {
        target.textContent = "Not read";
        myLibrary[targetBookIndex].isRead = false;
      }
      break;

    case "remove-book":
      myLibrary.splice(targetBookIndex, 1);
      refreshBooklist();
      break;
  }
});
