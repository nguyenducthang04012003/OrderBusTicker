const tripModel = require("../models/tripModel");

const getAllTrips = async (req, res) => {
  try {
    const trips = await tripModel.getAllTrips();
    res.status(200).json(trips);
  } catch (err) {
    console.error("Lỗi truy vấn getAllTrip:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ", details: err.message });
  }
};

module.exports = {
  getAllTrips,
};
