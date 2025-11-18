const express = require("express");
const router = express.Router();

// In-memory database
let books = [
  { id: 1, title: "1984", author: "Orwell" },
  { id: 2, title: "The Alchemist", author: "Coelho" }
];

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// POST add a new book
router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.json(newBook);
});

// PUT update a book
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  book.title = req.body.title ?? book.title;
  book.author = req.body.author ?? book.author;

  res.json(book);
});

// DELETE remove a book
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);

  res.json({ message: "Book deleted" });
});

module.exports = router;
