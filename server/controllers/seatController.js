// controllers/seatController.js
const {
  getSeatsByBusId,
  getSeatsByTripId,
  updateSeatAvailability,
} = require("../models/seatModel");

exports.getSeatsByBus = async (req, res) => {
  try {
    const busId = req.params.busId;
    const seats = await getSeatsByBusId(busId);
    res.status(200).json(seats);
  } catch (err) {
    console.error("Lỗi truy vấn getSeatsByBus:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ" });
  }
};


exports.getSeatsByTripId = async (req, res) => {
  try{
    const tripId = parseInt(req.params.tripId);

    if(!tripId)  return res.status(400).json({error: "tripId khoong hop le"}); 
      const seats = await getSeatsByTripId(tripId);
      res.status(200).json(seats);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ghế", error.message);
    res.status(500).json({error: "Lỗi khi lấy danh sách ghế"});
  }
};

exports.updateSeat = async (req, res) => {
  try {
    const { seatId, isAvailable } = req.body;
    await updateSeatAvailability(seatId, isAvailable);
    res.status(200).json({ message: "Seat status updated successfully" });
  } catch (err) {
    console.error("Lỗi cập nhật ghế:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ" });
  }
};
