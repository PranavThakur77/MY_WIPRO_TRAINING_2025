const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Registration Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Registration
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        await newUser.save();
        console.log("Saved to MongoDB:", newUser);

        res.send(`Registration successful for ${firstName} ${lastName}`);
    } catch (err) {
        console.log(err);
        res.send("Error registering user!");
    }
});

module.exports = router;
