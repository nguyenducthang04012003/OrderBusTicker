const pool = require("../db/connection");

const getAllBuses = async () => {
  const [rows] = await pool.query(`
    SELECT b.id, b.license_plate, b.seat_count, b.bus_type, r.origin, r.destination
    FROM buses b
    LEFT JOIN routes r ON b.route_id = r.id 
  `);
  return rows;
};

module.exports = {
  getAllBuses,
}