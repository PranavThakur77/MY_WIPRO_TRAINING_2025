import React, { useState } from 'react';

const CourseForm = ({ onAddCourse }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCourse(formData);     // send data to parent
    setFormData({
      title: "",
      description: "",
      instructor: "",
      duration: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Course</h3>

      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
      /><br/>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      /><br/>

      <input
        type="text"
        name="instructor"
        placeholder="Instructor"
        value={formData.instructor}
        onChange={handleChange}
      /><br/>

      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      /><br/>

      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
