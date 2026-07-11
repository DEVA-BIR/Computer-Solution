// Import mysql2 promise wrapper
const mysql = require("mysql2/promise");

// Database connection configuration
const dbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

 ssl: {
    rejectUnauthorized: true,
  },
};
// Create connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);

    return rows;

  } catch (error) {
    console.log("DATABASE QUERY ERROR:");
    console.log(error);

    throw error;
  }
}

// Export query function
module.exports = {
  query,
};