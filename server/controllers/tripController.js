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

const getTripIdByRoute = async (req, res) => {
  try {
    const routeId = parseInt(req.params.routeId);
    if (isNaN(routeId))
      return res.status(400).json({ error: "routeId không hợp lệ" });

    const trips = await tripModel.findTripsByRouteId(routeId);
    console.log(">>>>>", trips);
    res.status(200).json(trips);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tripid:", error); // In rõ lỗi
    res.status(500).json({ error: "Lỗi khi lấy danh sách tripid" });
  }
};

module.exports = {
  getAllTrips,
  getTripIdByRoute,
};
