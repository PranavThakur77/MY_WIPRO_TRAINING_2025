const { body, validationResult } = require('express-validator');

exports.courseValidationRules = [
  body('name').notEmpty().withMessage("Course name is required"),
  body('duration').notEmpty().withMessage("Course duration is required")
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  next();
};
