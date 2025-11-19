const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.json({
        message: "User created successfully",
        data: req.body
    });
});

module.exports = router;
