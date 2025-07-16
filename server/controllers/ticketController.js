const ticketModel = require("../models/ticketModel");
const userModel = require('../models/userModel'); 

exports.getTicketsByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.query;

  if (!phoneNumber) {
    return res
      .status(400)
      .json({ message: "Số điện thoại không được để trống." });
  }

  try {
    const tickets = await ticketModel.findTicketsByPhoneNumber(phoneNumber);

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vé nào với số điện thoại này." });
    }

    res.json(tickets);
  } catch (err) {
    console.error("Lỗi Controller khi tìm kiếm vé theo số điện thoại:", err);
    res.status(500).json({ error: "Lỗi server khi tìm kiếm vé." });
  }
};

exports.bookTicket = async (req, res) => {
  try {
    const { name, phone, email, trip_id, seat_id } = req.body;

    if (!name || !phone || !email || !trip_id || !seat_id) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    // Kiểm tra user đã tồn tại chưa
    let user = await userModel.findUserByEmail(email);
    if (!user) {
      // Tạo user mới
      const result = await userModel.createUser(name, phone, email);
      user = { id: result.insertId };
    }

    // Tạo vé mới
    const resultTicket = await ticketModel.createTicket(
      user.id,
      trip_id,
      seat_id,
      "booked"
    );

    res.status(201).json({
      message: "Đặt vé thành công",
      ticketId: resultTicket.insertId,
    });
  } catch (error) {
    console.error("Lỗi khi đặt vé:", error.message);
    if (
      error.message.includes("Seat is not available") ||
      error.message.includes("Invalid seat for this trip")
    ) {
      return res
        .status(400)
        .json({ error: "Không thể đặt vé", details: error.message });
    }
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
};

exports.getAllTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.getAllTickets();
    res.status(200).json(ticket);
  } catch (err) {
    console.error("Lỗi truy vấn:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ", details: err.message });
  }
};
