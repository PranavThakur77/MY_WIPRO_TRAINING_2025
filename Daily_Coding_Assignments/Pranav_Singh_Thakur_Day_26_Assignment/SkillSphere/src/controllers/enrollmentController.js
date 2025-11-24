const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

const getEnrollments = async () => {
    try {
        const enrollments = await Enrollment.find().populate('userId', 'name email');
        console.log('Enrollments:', enrollments);
    } catch (err) {
        console.error('Error fetching enrollments:', err);
    }
};

module.exports = { getEnrollments };
