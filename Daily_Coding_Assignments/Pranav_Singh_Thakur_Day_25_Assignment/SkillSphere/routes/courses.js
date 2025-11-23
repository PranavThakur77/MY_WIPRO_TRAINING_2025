const express = require('express');
const router = express.Router();

let courses = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'React' }
];

// GET all courses
router.get('/', (req, res) => {
  res.json(courses);
});

// GET course by ID
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// POST new course
router.post('/', (req, res) => {
  const newCourse = { id: courses.length + 1, name: req.body.name };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

module.exports = router;
