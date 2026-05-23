const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "NotesDB",
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

console.log(`Configuring MySQL database pool for Host: ${dbConfig.host}, DB: ${dbConfig.database}...`);

const pool = mysql.createPool(dbConfig);

// Connection test for server start integration
const poolPromise = pool.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL Database successfully 🚀");
    connection.release(); // Return connection to the pool
    return pool;
  })
  .catch((err) => {
    console.error("MySQL Database Connection Failed! Bad Config: ", err.message);
    process.exit(1); // Exit process if database is unreachable
  });

module.exports = {
  pool,
  poolPromise,
};
