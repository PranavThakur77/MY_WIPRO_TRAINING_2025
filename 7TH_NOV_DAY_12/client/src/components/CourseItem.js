import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>

      <p className="course-info"><strong>Description:</strong> {course.description}</p>
      <p className="course-info"><strong>Instructor:</strong> {course.instructor}</p>
      <p className="course-info"><strong>Duration:</strong> {course.duration}</p>
    </div>
  );
};

export default CourseItem;
