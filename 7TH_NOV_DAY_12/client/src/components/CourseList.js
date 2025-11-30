import React, { useEffect, useState } from 'react';
import CourseForm from './CourseForm';
import CourseItem from './CourseItem';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from json-server
  const fetchCourses = async () => {
    const res = await fetch("http://localhost:3001/Courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add new course to list
  const addCourse = async (newCourse) => {
    const res = await fetch("http://localhost:3001/Courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse)
    });

    const createdCourse = await res.json();
    setCourses([...courses, createdCourse]);
  };

  return (
    <div>
      <h2>Courses</h2>

      <CourseForm onAddCourse={addCourse} />

      <ul>
        {courses.map(course => (
          <CourseItem key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
