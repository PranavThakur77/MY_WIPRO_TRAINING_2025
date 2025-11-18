const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// ----------------------------
// Global Logging Middleware
// ----------------------------
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] [${req.method}] ${req.url}`);
  next();
});

// ----------------------------
// Challenge 1: Basic Routes
// ----------------------------
app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.get("/status", (req, res) => {
  res.json({
    server: "running",
    uptime: "OK"
  });
});

// ----------------------------
// Challenge 2: Query Params
// ----------------------------
app.get("/products", (req, res) => {
  const name = req.query.name;

  if (name) {
    return res.json({ query: name });  // Bonus: JSON format
  }

  res.send("Please provide a product name");
});

// ----------------------------
// Challenge 5: Modular Routing
// ----------------------------
const bookRouter = require("./routes/books");
app.use("/books", bookRouter);

// ----------------------------
// Global 404 Handler
// ----------------------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ----------------------------
// Global Error Handler (Bonus)
// ----------------------------
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ----------------------------
// Start Server
// ----------------------------
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
