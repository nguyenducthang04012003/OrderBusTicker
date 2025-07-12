const pool = require("../db/connection");

const getAllRoutes = async () => {
  const [rows] = await pool.query(`
   SELECT 
        routes.id AS route_id,
        routes.origin,
        routes.destination,
        routes.estimated_duration_minutes,
        trips.id AS trip_id,
        trips.departure_time,
        trips.price
      FROM routes
      LEFT JOIN buses ON buses.route_id = routes.id
      LEFT JOIN trips ON trips.bus_id = buses.id
  `);
  return rows;
}

module.exports = {
  getAllRoutes,
}