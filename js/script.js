// storage key
const storageKey = "bookshelf";

// simpan data
let bookshelf = {
  "belum selesai dibaca": [],
  "selesai dibaca": [],
};

// save data localStorage
function saveToStorage() {
  localStorage.setItem(storageKey, JSON.stringify(bookshelf));
}

// load data localStorage
function loadFromStorage() {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    bookshelf = JSON.parse(storedData);
    displayBookshelf();
  }
}

// add new book
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isFinished = document.getElementById("isFinished").checked;
  const year = document.getElementById("year").value;

  // allert, judul dan author tidak kosong
  if (title.trim() !== "" && author.trim() !== "") {
    const book = {
      id: generateId(),
      title: title,
      author: author,
      year: year, // tahun
      isComplete: isFinished,
    };
    const shelf = isFinished ? "selesai dibaca" : "belum selesai dibaca";
    bookshelf[shelf].push(book);
    saveToStorage();
    displayBookshelf();
    // Reset
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("isFinished").checked = false;
  } else {
    alert("Judul dan Author tidak boleh kosong!");
  }
}

// Generate ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Display bookshelf
function displayBookshelf() {
  const belumSelesaiDibacaList = document.getElementById("belumSelesaiDibaca");
  const selesaiDibacaList = document.getElementById("selesaiDibaca");

  // bersihkan daftar buku sebelum menampilkan yang baru
  belumSelesaiDibacaList.innerHTML = "";
  selesaiDibacaList.innerHTML = "";

  // daftar buku belum selesai dibaca
  bookshelf["belum selesai dibaca"].forEach((book) => {
    const listItem = createBookListItem(book, "belum selesai dibaca");
    belumSelesaiDibacaList.appendChild(listItem);
  });

  // daftar buku sudah selesai dibaca
  bookshelf["selesai dibaca"].forEach((book) => {
    const listItem = createBookListItem(book, "selesai dibaca");
    selesaiDibacaList.appendChild(listItem);
  });
}

// list item
function createBookListItem(book, shelf) {
  const listItem = document.createElement("li");
  listItem.textContent = `Buku ${book.title}, by ${book.author}, Tahun: ${book.year}`; // Tambahkan tahun ke dalam teks buku

  // tombol Pindahkan
  const moveButton = document.createElement("button");
  moveButton.textContent =
    shelf === "selesai dibaca"
      ? "Pindahkan ke Belum Dibaca"
      : "Pindahkan ke Selesai Dibaca";
  moveButton.classList.add("move");
  moveButton.onclick = function () {
    moveBook(
      book.id,
      shelf,
      shelf === "selesai dibaca" ? "belum selesai dibaca" : "selesai dibaca"
    );
  };
  listItem.appendChild(moveButton);

  // tombol Hapus
  const removeButton = document.createElement("button");
  removeButton.textContent = "Hapus";
  removeButton.classList.add("remove");
  removeButton.onclick = function () {
    removeBook(book.id, shelf);
  };
  listItem.appendChild(removeButton);

  return listItem;
}

// pindahkna
function moveBook(id, sourceShelf, targetShelf) {
  const shelfSource = bookshelf[sourceShelf];
  const shelfTarget = bookshelf[targetShelf];

  const bookIndex = shelfSource.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    const book = shelfSource.splice(bookIndex, 1)[0];
    book.isComplete = targetShelf === "selesai dibaca";
    shelfTarget.push(book);
    saveToStorage(); // simpan perubahan
    displayBookshelf();
  }
}

// Remove
function removeBook(id, shelf) {
  const shelfBooks = bookshelf[shelf];
  const bookIndex = shelfBooks.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    shelfBooks.splice(bookIndex, 1);
    saveToStorage(); // simpan perubahan
    displayBookshelf();
  }
}

window.onload = function () {
  loadFromStorage(); // Load data
};
