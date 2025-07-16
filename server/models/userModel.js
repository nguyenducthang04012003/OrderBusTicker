const pool = require("../db/connection");

// Tạo người dùng mới
exports.createUser = async (name, phone, email) => {
  const [result] = await pool.execute(
    "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)",
    [name, phone, email]
  );
  return result;
};

// Tìm user theo số điện thoại
exports.findUserByPhone = async (phone) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE phone = ?", [
    phone,
  ]);
  return rows[0];
};

// Tìm user theo email
exports.findUserByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

// Lấy tất cả người dùng
exports.getAllUsers = async () => {
  const [rows] = await pool.execute("SELECT id, name, phone, email FROM users");
  return rows;
};
