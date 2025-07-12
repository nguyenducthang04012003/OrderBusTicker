const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa trong pool
  queueLimit: 0,
});

// Kiểm tra kết nối (tùy chọn nhưng nên có để debug)
pool.getConnection()
  .then(connection => {
    console.log('MySQL connected successfully to database:', process.env.DB_NAME);
    connection.release(); // Giải phóng kết nối về pool
  })
  .catch(err => {
    console.error('MySQL connection error:', err);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được DB
  });

module.exports = pool;
