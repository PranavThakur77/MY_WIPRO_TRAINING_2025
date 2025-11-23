const express = require('express');
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { courseValidationRules, validate } = require('../middleware/validationMiddleware');
const rateLimiter = require('../middleware/rateLimit');

router.use(rateLimiter);

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', courseValidationRules, validate, createCourse);
router.put('/:id', courseValidationRules, validate, updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
