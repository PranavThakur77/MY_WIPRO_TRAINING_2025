const express = require("express");
const app = express();

// import router
const courseRouter = require("./routes/courses");

// home route (Challenge 1)
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

// use courses router
app.use("/courses", courseRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
