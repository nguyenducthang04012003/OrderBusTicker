const userModel = require("../models/userModel");

// [POST] Tạo người dùng mới (đặt vé hoặc đăng ký)
exports.createUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email đã tồn tại" });
    }

    // Tạo user mà không cần password
    const result = await userModel.createUser(name, phone, email);
    res
      .status(201)
      .json({ message: "Tạo người dùng thành công", userId: result.insertId });
  } catch (err) {
    console.error("Lỗi tạo người dùng:", err.message);
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
};


// [GET] Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách người dùng:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// [GET] Tìm user theo số điện thoại
exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await userModel.findUserByPhone(phone);
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Lỗi tìm người dùng:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};
