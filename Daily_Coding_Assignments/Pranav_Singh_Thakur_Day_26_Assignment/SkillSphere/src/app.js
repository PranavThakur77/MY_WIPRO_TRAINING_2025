// src/app.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('./config/mongoose'); // updated config

(async () => {
  try {
    console.log('--- Raw MySQL Insert ---');
    // 1️ MySQL Raw Insert
    const mysqlConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    const now = new Date();
    const [mysqlResult] = await mysqlConnection.execute(
      `INSERT INTO courses (name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
      ['Node.js Basics', 'Learn Node.js from scratch', now, now]
    );
    console.log('MySQL course inserted successfully:', mysqlResult);
    await mysqlConnection.end();

    console.log('--- Sequelize ORM ---');
    // 2️ Sequelize ORM
    const sequelize = new Sequelize(
      process.env.MYSQL_DATABASE,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASSWORD,
      { host: process.env.MYSQL_HOST, dialect: 'mysql', logging: true }
    );

    const Instructor = sequelize.define('Instructor', {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true }
    });

    const Course = sequelize.define('Course', {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT
    });

    Instructor.hasMany(Course, { foreignKey: 'instructorId' });
    Course.belongsTo(Instructor, { foreignKey: 'instructorId' });

    await sequelize.sync({ force: true });

    const instructor = await Instructor.create({ name: 'John Doe', email: 'john@example.com' });
    await Course.create({
      name: 'Advanced JS',
      description: 'Deep dive into JS',
      instructorId: instructor.id
    });

    const coursesByInstructor = await Course.findAll({
      where: { instructorId: instructor.id },
      include: Instructor
    });

    console.log('Courses by instructor:', JSON.stringify(coursesByInstructor, null, 2));

    console.log('--- MongoDB Insert ---');
    // 3️ MongoDB Insert
    const userSchema = new mongoose.Schema({
      name: String,
      email: String
    });
    const enrollmentSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      courseName: String,
      dateEnrolled: { type: Date, default: Date.now }
    });

    const User = mongoose.model('User', userSchema);
    const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

    // Insert users
    const user1 = await User.create({ name: 'Alice', email: 'alice@example.com' });
    const user2 = await User.create({ name: 'Bob', email: 'bob@example.com' });

    // Insert enrollments
    await Enrollment.create({ userId: user1._id, courseName: 'Node.js Basics' });
    await Enrollment.create({ userId: user2._id, courseName: 'Advanced JS' });

    const enrollments = await Enrollment.find().populate('userId');
    console.log('Enrollments:', JSON.stringify(enrollments, null, 2));

    console.log('All operations completed successfully.');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
