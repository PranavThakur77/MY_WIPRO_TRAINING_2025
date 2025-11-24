// Steps
// 1. Import mysql2 for MySQL connection.
// 2. Import dotenv to load environment variables from .env.
// 3. Create a MySQL connection using credentials from .env.
// 4. Connect to the MySQL database and handle any errors.
// 5. Export the connection object for use in other files.

const mysql = require('mysql2');        
require('dotenv').config();              

const connection = mysql.createConnection({  
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(err => {               
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;            
