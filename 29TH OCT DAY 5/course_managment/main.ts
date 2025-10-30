import { CourseCategory } from "./interface.js";
import { CourseManager } from "./Course.js";
import { InstructorManager } from "./instructor.js";
import { StudentManager } from "./student.js";

// Initialize managers
const courseManager = new CourseManager();
const instructorManager = new InstructorManager();
const studentManager = new StudentManager();

console.log("=== COURSE MANAGEMENT SYSTEM DEMO ===\n");

// 1️⃣ Add instructors
const pranavInstructor = instructorManager.addInstructor("Pranav", [
  CourseCategory.DEVELOPMENT,
  CourseCategory.TESTING,
]);

const kavyaInstructor = instructorManager.addInstructor("Kavya", [
  CourseCategory.DESIGN,
  CourseCategory.MARKETING,
]);

console.log("\nInstructors:", instructorManager.getAllInstructors());

// 2️⃣ Add students
const pranavStudent = studentManager.addStudent("Pranav");
const kavyaStudent = studentManager.addStudent("Kavya");

console.log("\nStudents:", studentManager.getAllStudents());

// 3️⃣ Create courses
const jsCourse = courseManager.createCourse(
  "JavaScript for Beginners",
  CourseCategory.DEVELOPMENT,
  pranavInstructor.id,
  "Learn the fundamentals of JavaScript."
);

const uiCourse = courseManager.createCourse(
  "UI/UX Design",
  CourseCategory.DESIGN,
  kavyaInstructor.id,
  "Design beautiful user interfaces."
);

console.log("\nCourses after creation:", courseManager.getAllCourses());

// 4️⃣ Enroll students
courseManager.enrollStudent(jsCourse.id, pranavStudent.id);
courseManager.enrollStudent(jsCourse.id, kavyaStudent.id);
courseManager.enrollStudent(uiCourse.id, pranavStudent.id);

console.log("\nCourses after enrollment:", courseManager.getAllCourses());
console.log("Students after enrollment:", studentManager.getAllStudents());

// 5️⃣ Unenroll a student
studentManager.unenrollStudent(jsCourse.id, kavyaStudent.id);
console.log("\nAfter unenrolling Kavya from JS course:");
console.log("Courses:", courseManager.getAllCourses());
console.log("Students:", studentManager.getAllStudents());

// 6️⃣ Update course details
courseManager.updateCourse(jsCourse.id, {
  title: "Advanced JavaScript",
  description: "Deep dive into modern JS concepts.",
});

console.log("\nUpdated JS Course:", courseManager.getCourse(jsCourse.id));

// 7️⃣ Remove an instructor (auto-unassign from their courses)
instructorManager.removeInstructor(kavyaInstructor.id);
console.log("\nAfter removing instructor Kavya:");
console.log("Courses:", courseManager.getAllCourses());
console.log("Instructors:", instructorManager.getAllInstructors());

// 8️⃣ Remove a student
studentManager.removeStudent(pranavStudent.id);
console.log("\nAfter removing Pranav:");
console.log("Courses:", courseManager.getAllCourses());
console.log("Students:", studentManager.getAllStudents());

console.log("\n=== DEMO COMPLETE ===");
