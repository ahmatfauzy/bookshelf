const storageKey = "bookshelf";

let bookshelf = {
  "belum selesai dibaca": [],
  "selesai dibaca": [],
};

function saveToStorage() {
  localStorage.setItem(storageKey, JSON.stringify(bookshelf));
}

function loadFromStorage() {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    bookshelf = JSON.parse(storedData);
    displayBookshelf();
  }
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isFinished = document.getElementById("isFinished").checked;

  if (title && author) {
    const shelf = isFinished ? "selesai dibaca" : "belum selesai dibaca";
    const book = { title, author, isFinished };
    bookshelf[shelf].push(book);
    saveToStorage();
    displayBookshelf();
    // Reset form values
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isFinished").checked = false;
  }
}

function moveBook(index, sourceShelf, targetShelf) {
  const book = bookshelf[sourceShelf].splice(index, 1)[0];
  book.isFinished = targetShelf === "selesai dibaca";
  bookshelf[targetShelf].push(book);
  saveToStorage();
  displayBookshelf();
}

function removeBook(index, shelf) {
  bookshelf[shelf].splice(index, 1);
  saveToStorage();
  displayBookshelf();
}

function displayBookshelf() {
  const belumSelesaiDibacaList = document.getElementById("belumSelesaiDibaca");
  const selesaiDibacaList = document.getElementById("selesaiDibaca");

  belumSelesaiDibacaList.innerHTML = "";
  selesaiDibacaList.innerHTML = "";

  //dereng dibaca
  bookshelf["belum selesai dibaca"].forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${book.title} by ${book.author}`;
    const moveButton = document.createElement("button");
    moveButton.textContent = "Pindahkan ke Selesai Dibaca";
    moveButton.onclick = () =>
      moveBook(index, "belum selesai dibaca", "selesai dibaca");
    listItem.appendChild(moveButton);
    const removeButton = document.createElement("button");
    removeButton.textContent = "Hapus";
    removeButton.onclick = () => removeBook(index, "belum selesai dibaca");
    listItem.appendChild(removeButton);
    belumSelesaiDibacaList.appendChild(listItem);
  });

  //Wis baca
  bookshelf["selesai dibaca"].forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${book.title} by ${book.author}`;
    const moveButton = document.createElement("button");
    moveButton.textContent = "Pindahkan ke Belum Selesai Dibaca";
    moveButton.onclick = () =>
      moveBook(index, "selesai dibaca", "belum selesai dibaca");
    listItem.appendChild(moveButton);
    const removeButton = document.createElement("button");
    removeButton.textContent = "Hapus";
    removeButton.onclick = () => removeBook(index, "selesai dibaca");
    listItem.appendChild(removeButton);
    selesaiDibacaList.appendChild(listItem);
  });
}

// LOCAL STORAGE
loadFromStorage();
