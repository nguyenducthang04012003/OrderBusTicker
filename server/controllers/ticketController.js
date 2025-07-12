const ticketModel = require("../models/ticketModel");

exports.bookTicket = async (req, res) => {
  try {
    const { user_id, trip_id, seat_id, status } = req.body;
    const result = await ticketModel.createTicket(
      user_id,
      trip_id,
      seat_id,
      status
    );
    res
      .status(201)
      .json({ message: "Đặt vé thành công", ticketId: result.insertId });
  } catch (error) {
    console.error("Lỗi khi đặt vé:", error.message);

    // Bắt lỗi trigger SQL và phản hồi rõ ràng
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
