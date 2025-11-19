const express = require("express");
const app = express();

// Import custom middleware & routes
const logger = require("./middleware/logger");
const usersRoute = require("./routes/users");
const coursesRoute = require("./routes/courses");

// Set view engine
app.set("view engine", "ejs");

// Global logging middleware
app.use(logger);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", usersRoute);
app.use("/courses", coursesRoute);

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
