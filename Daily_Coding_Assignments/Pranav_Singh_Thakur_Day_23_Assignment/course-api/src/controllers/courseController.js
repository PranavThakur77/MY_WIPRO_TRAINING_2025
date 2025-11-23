let courses = require('../data/courseData');

// GET all courses
exports.getCourses = (req, res) => {
  res.json(courses);
};

// GET one course
exports.getCourseById = (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) return res.status(404).json({ error: "Course not found" });

  res.json(course);
};

// CREATE course
exports.createCourse = (req, res) => {
  const { name, duration } = req.body;

  const newCourse = {
    id: courses.length + 1,
    name,
    duration
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
};

// UPDATE course
exports.updateCourse = (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) return res.status(404).json({ error: "Course not found" });

  const { name, duration } = req.body;

  course.name = name || course.name;
  course.duration = duration || course.duration;

  res.json(course);
};

// DELETE course
exports.deleteCourse = (req, res) => {
  const id = Number(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Course not found" });

  courses.splice(index, 1);

  res.json({ message: "Course deleted" });
};
