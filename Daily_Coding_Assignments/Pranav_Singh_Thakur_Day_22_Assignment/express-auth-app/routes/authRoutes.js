const express = require('express');
const passport = require('passport');

const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Dashboard
router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.send("Please login first.");
    res.send(`Welcome, ${req.user.firstName}!`);
});

// Protected Admin Route
router.get('/admin', (req, res) => {
    if (!req.isAuthenticated()) return res.send("Access Denied");
    if (req.user.role !== "admin") return res.send("Access Denied");

    res.render('admin');
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;
