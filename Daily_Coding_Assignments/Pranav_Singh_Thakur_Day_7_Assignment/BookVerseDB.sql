
// USER STORY 1: DATABASE SETUP
// -----------------------------

// 1️⃣ Create (or switch to) the database
use BookVerseDB;

// 2️⃣ Create collections: Authors, Books, Users
db.createCollection("Authors");
db.createCollection("Books");
db.createCollection("Users");

// 3️⃣ Insert sample data

// --- Authors Collection ---
db.Authors.insertMany([
  { _id: 1, name: "Isaac Asimov", nationality: "Russian-American", birthYear: 1920 },
  { _id: 2, name: "J.K. Rowling", nationality: "British", birthYear: 1965 },
  { _id: 3, name: "George R.R. Martin", nationality: "American", birthYear: 1948 }
]);

// --- Users Collection ---
db.Users.insertMany([
  { _id: 1, name: "Alice Johnson", email: "alice@example.com", joinDate: new Date("2025-01-10") },
  { _id: 2, name: "Bob Smith", email: "bob@example.com", joinDate: new Date("2025-07-22") },
  { _id: 3, name: "Charlie Brown", email: "charlie@example.com", joinDate: new Date("2024-12-15") }
]);

// --- Books Collection ---
// (One-to-Many relationship using authorId reference, ratings embedded)
db.Books.insertMany([
  {
    _id: 1,
    title: "Foundation",
    genre: "Science Fiction",
    publicationYear: 1951,
    authorId: 1,
    ratings: [
      { user: "Alice Johnson", score: 5, comment: "Classic sci-fi!" },
      { user: "Bob Smith", score: 4, comment: "Enjoyed it a lot" }
    ]
  },
  {
    _id: 2,
    title: "I, Robot",
    genre: "Science Fiction",
    publicationYear: 1950,
    authorId: 1,
    ratings: [
      { user: "Charlie Brown", score: 5, comment: "Brilliant ideas!" }
    ]
  },
  {
    _id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
    authorId: 2,
    ratings: [
      { user: "Alice Johnson", score: 5, comment: "Loved it!" }
    ]
  },
  {
    _id: 4,
    title: "Harry Potter and the Deathly Hallows",
    genre: "Fantasy",
    publicationYear: 2007,
    authorId: 2,
    ratings: []
  },
  {
    _id: 5,
    title: "A Game of Thrones",
    genre: "Fantasy",
    publicationYear: 1996,
    authorId: 3,
    ratings: [
      { user: "Bob Smith", score: 5, comment: "Epic read!" },
      { user: "Charlie Brown", score: 4, comment: "Intriguing characters" }
    ]
  }
]);

// ✅ User Story 1 complete: Database structured, relationships modeled properly.


// -----------------------------
// USER STORY 2: CRUD OPERATIONS
// -----------------------------

// 1️⃣ Insert a new user
db.Users.insertOne({
  _id: 4,
  name: "Diana Prince",
  email: "diana@example.com",
  joinDate: new Date("2025-10-01")
});

// Insert a new book
db.Books.insertOne({
  _id: 6,
  title: "The Caves of Steel",
  genre: "Science Fiction",
  publicationYear: 1953,
  authorId: 1,
  ratings: []
});

// 2️⃣ Retrieve all books of the genre “Science Fiction”
db.Books.find({ genre: "Science Fiction" }).pretty();

// 3️⃣ Update the publicationYear of one book
db.Books.updateOne(
  { title: "Foundation" },
  { $set: { publicationYear: 1952 } }
);

// 4️⃣ Delete one user record
db.Users.deleteOne({ name: "Charlie Brown" });

// 5️⃣ Add a new rating to a book using $push
db.Books.updateOne(
  { title: "A Game of Thrones" },
  { $push: { ratings: { user: "Diana Prince", score: 5, comment: "Absolutely amazing!" } } }
);

// ✅ User Story 2 complete: CRUD operations done.


// -----------------------------
// USER STORY 3: QUERYING & FILTERING
// -----------------------------

// 1️⃣ Retrieve all books published after 2015
db.Books.find({ publicationYear: { $gt: 2015 } }).pretty();

// 2️⃣ Find authors who have written books in the “Fantasy” genre
db.Authors.find({
  _id: { $in: db.Books.find({ genre: "Fantasy" }).map(book => book.authorId) }
}).pretty();

// 3️⃣ Retrieve all users who joined within the last 6 months
db.Users.find({
  joinDate: {
    $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
  }
}).pretty();

// 4️⃣ Find books with an average rating greater than 4
db.Books.aggregate([
  {
    $addFields: {
      avgRating: { $avg: "$ratings.score" }
    }
  },
  {
    $match: { avgRating: { $gt: 4 } }
  },
  {
    $project: { title: 1, avgRating: 1, _id: 0 }
  }
]);

// ✅ User Story 3 complete: Queries and filters work correctly.


// -----------------------------
// BONUS CHALLENGE
// -----------------------------

// 1️⃣ Display the top 3 most-rated books (by number of ratings)
db.Books.aggregate([
  {
    $project: {
      title: 1,
      totalRatings: { $size: "$ratings" }
    }
  },
  { $sort: { totalRatings: -1 } },
  { $limit: 3 }
]);

// ✅ Bonus complete.
