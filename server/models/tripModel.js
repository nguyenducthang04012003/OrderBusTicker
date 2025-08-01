const pool = require("../db/connection");

const getAllTrips = async () => {
  const [rows] = await pool.query(`
    SELECT t.id, t.departure_time, t.price, b.license_plate, r.destination
    FROM trips t
    JOIN buses b ON t.bus_id = b.id
    JOIN routes r ON b.route_id = r.id
  `);
  return rows;
};

const findTripsByRouteId = async (routeId) => {
  const [rows] = await pool.query(
    `SELECT id, bus_id, route_id, departure_time, price FROM trips WHERE route_id = ?`,
    [routeId]
  );
  return rows;
};

module.exports = {
  getAllTrips,
  findTripsByRouteId,
};
