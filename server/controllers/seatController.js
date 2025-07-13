// controllers/seatController.js
const {
  getSeatsByBusId,
  isSeatAvailable,
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

exports.checkSeatAvailability = async (req, res) => {
  try {
    const { seatId, tripId } = req.query;

    if (!seatId || !tripId) {
      return res.status(400).json({ error: "Missing seatId or tripId" });
    }

    const parsedSeatId = parseInt(seatId);
    const parsedTripId = parseInt(tripId);

    if (isNaN(parsedSeatId) || isNaN(parsedTripId)) {
      return res.status(400).json({ error: "Invalid seatId or tripId" });
    }

    const isAvailable = await isSeatAvailable(parsedSeatId, parsedTripId);
    res.status(200).json({
      seatId: parsedSeatId,
      tripId: parsedTripId,
      isAvailable: isAvailable,
    });
  } catch (err) {
    console.error("Lỗi kiểm tra ghế:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ" });
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
