const db = require('../config/db');

const addCourse = (courseName, description) => {
    const query = 'INSERT INTO courses (name, description) VALUES (?, ?)';
    db.query(query, [courseName, description], (err, results) => {
        if (err) {
            console.error('Error inserting course:', err);
        } else {
            console.log('Course inserted successfully:', results);
        }
    });
};

module.exports = { addCourse };
