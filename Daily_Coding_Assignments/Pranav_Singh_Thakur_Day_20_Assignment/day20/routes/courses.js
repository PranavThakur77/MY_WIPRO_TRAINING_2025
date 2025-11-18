const express = require("express");
const router = express.Router();

// middleware for validation (Challenge 3)
function validateCourseId(req, res, next) {
  const id = req.params.id;

  if (!/^[0-9]+$/.test(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  next();
}

// Challenge 2 + Challenge 3
router.get("/:id", validateCourseId, (req, res) => {
  const id = req.params.id;
  res.json({
    id: id,
    name: "React Mastery",
    duration: "6 weeks"
  });
});

module.exports = router;
