use BookVerseCloudDB;

// ----------------------
// Index Creation
// ----------------------
db.Books.createIndex({ genre: 1 });
db.Books.createIndex({ authorId: 1 });
db.Books.createIndex({ "ratings.score": 1 });

// Optional: compound index (bonus)
db.Books.createIndex({ genre: 1, publicationYear: -1 });

// ----------------------
// Aggregation Queries
// ----------------------

// 1️⃣ Average Rating per Book
db.Books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } }
]);

// 2️⃣ Top 3 Highest-Rated Books
db.Books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } },
  { $sort: { avgRating: -1 } },
  { $limit: 3 }
]);

// 3️⃣ Number of Books Published per Genre
db.Books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
]);

// 4️⃣ Authors with More Than 2 Books
db.Books.aggregate([
  { $group: { _id: "$authorId", bookCount: { $sum: 1 } } },
  { $match: { bookCount: { $gt: 2 } } }
]);

// 5️⃣ Total Reward Points per Author (Sum of Ratings)
db.Books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$authorId", totalPoints: { $sum: "$ratings.score" } } }
]);
