const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + safeName);
    }
});

// PDF file filter
function fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
}

const upload = multer({ storage, fileFilter });

// POST /upload
router.post("/", upload.single("file"), (req, res) => {
    res.send("File uploaded successfully: " + req.file.filename);
});

module.exports = router;
