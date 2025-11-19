const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const availableCourses = [
        "JavaScript Basics",
        "Node.js Advanced",
        "Full Stack Development",
        "Database Essentials"
    ];

    res.render("courses", { courses: availableCourses });
});

module.exports = router;
