-- ==============================================
-- USER STORY 1: DATABASE SETUP (DDL)
-- ==============================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS TechNovaDB;
USE TechNovaDB;

-- 2. Create Tables
-- --------------------

CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(100) NOT NULL UNIQUE,
    Location VARCHAR(100)
);

CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(100) NOT NULL,
    Gender ENUM('M', 'F', 'Other'),
    DOB DATE,
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DeptID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,2),
    ReviewDate DATE,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE,
    RewardAmount DECIMAL(10,2),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

-- 3. Indexes
CREATE INDEX idx_empname ON Employee(EmpName);
CREATE INDEX idx_deptid ON Employee(DeptID);

-- ==============================================
-- USER STORY 2: INSERT AND MANAGE DATA (DML)
-- ==============================================

-- Insert Department Data
INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Chennai'),
(105, 'Operations', 'Hyderabad');

-- Insert Employee Data
INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Vikram', 'M', '1992-11-20', '2019-10-12', 103),
(5, 'Kiran', 'M', '1993-12-05', '2022-05-30', 104);

-- Insert Project Data
INSERT INTO Project VALUES
(201, 'HRMS Revamp', 102, '2020-01-01', '2020-12-31'),
(202, 'ERP System', 101, '2019-04-01', '2021-03-31'),
(203, 'Finance Tracker', 103, '2021-06-01', '2022-02-28'),
(204, 'Website Redesign', 104, '2022-07-01', '2023-03-01'),
(205, 'Cloud Migration', 101, '2023-01-15', NULL);

-- Insert Performance Data
INSERT INTO Performance VALUES
(1, 202, 4.5, '2023-12-15'),
(2, 201, 4.0, '2023-12-20'),
(3, 205, 4.8, '2024-05-05'),
(4, 203, 3.9, '2023-11-22'),
(5, 204, 4.2, '2024-01-30');

-- Insert Reward Data
INSERT INTO Reward VALUES
(1, '2024-01-01', 2500),
(2, '2024-02-01', 1500),
(3, '2024-03-01', 3000),
(4, '2024-04-01', 800),
(5, '2024-05-01', 1200);

-- Update one employee’s department
UPDATE Employee SET DeptID = 103 WHERE EmpID = 5;

-- Delete one reward record where amount < 1000
DELETE FROM Reward WHERE RewardAmount < 1000;

-- ==============================================
-- USER STORY 3: GENERATE INSIGHTS (DQL)
-- ==============================================

-- 1. Employees who joined after 2019-01-01
SELECT * FROM Employee WHERE HireDate > '2019-01-01';

-- 2. Average performance rating of employees in each department
SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

-- 3. List employees with their age
SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age
FROM Employee;

-- 4. Total rewards given in the current year
SELECT YEAR(RewardMonth) AS Year, SUM(RewardAmount) AS TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

-- 5. Employees who have received rewards > 2000
SELECT e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

-- ==============================================
-- USER STORY 4: ADVANCED QUERIES (JOINS & SUBQUERIES)
-- ==============================================

-- 1. Employee Name, Department Name, Project Name, Rating
SELECT e.EmpName, d.DeptName, p.ProjectName, pr.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pr ON e.EmpID = pr.EmpID
JOIN Project p ON pr.ProjectID = p.ProjectID;

-- 2. Highest-rated employee in each department
SELECT d.DeptName, e.EmpName, p.Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
WHERE (e.EmpID, p.Rating) IN (
    SELECT EmpID, MAX(Rating)
    FROM Performance
    GROUP BY EmpID
);

-- 3. Employees who have not received any rewards
SELECT EmpName
FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

-- ==============================================
-- USER STORY 5: TRANSACTION CONTROL & OPTIMIZATION
-- ==============================================

-- 1. Transaction Example
START TRANSACTION;

INSERT INTO Employee VALUES (6, 'Riya', 'F', '1998-09-10', '2024-10-01', 102);
INSERT INTO Performance VALUES (6, 201, 4.6, '2024-10-31');

-- If no errors, commit, else rollback
COMMIT;
-- ROLLBACK; -- Uncomment if an error occurs

-- 2. Analyze slow query
EXPLAIN
SELECT e.EmpName, d.DeptName, p.ProjectName, pr.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pr ON e.EmpID = pr.EmpID
JOIN Project p ON pr.ProjectID = p.ProjectID;

-- 3. Run after adding indexes (already done at start) and re-check with EXPLAIN

-- ==============================================
-- BONUS: VIEW & STORED PROCEDURE
-- ==============================================

-- 1. View combining Employee, Department, and Performance
CREATE OR REPLACE VIEW EmployeePerformanceView AS
SELECT e.EmpName, d.DeptName, p.ProjectName, pr.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pr ON e.EmpID = pr.EmpID
JOIN Project p ON pr.ProjectID = p.ProjectID;

-- 2. Stored Procedure: GetTopPerformers
DELIMITER //
CREATE PROCEDURE GetTopPerformers(IN deptName VARCHAR(100))
BEGIN
    SELECT e.EmpName, d.DeptName, pr.Rating
    FROM Employee e
    JOIN Department d ON e.DeptID = d.DeptID
    JOIN Performance pr ON e.EmpID = pr.EmpID
    WHERE d.DeptName = deptName
    ORDER BY pr.Rating DESC
    LIMIT 3;
END //
DELIMITER ;

-- Test Stored Procedure
CALL GetTopPerformers('IT');

-- ==============================================
-- END OF SCRIPT
-- ==============================================
