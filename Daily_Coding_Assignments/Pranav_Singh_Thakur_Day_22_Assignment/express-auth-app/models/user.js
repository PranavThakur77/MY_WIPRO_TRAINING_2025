const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();
});

module.exports = mongoose.model('User', userSchema);
