const routeModel = require("../models/routeModel");

exports.getAllRoutes = async (req, res) => {
  try {
    const route = await routeModel.getAllRoutes();
    res.status(200).json(route);
  } catch (err) {
    console.error("Lỗi truy vấn:", err.message);
    res.status(500).json({ error: "Lỗi server nội bộ", details: err.message });
  }
};
