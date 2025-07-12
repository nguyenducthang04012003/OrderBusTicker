const busesModel = require("../models/busesModel");

exports.getallBuses = async (req, res) => {
  try{
    const buses = await busesModel.getAllBuses();
    res.json(buses);
  } catch (err) {
    console.error("Lỗi truy vấn:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};