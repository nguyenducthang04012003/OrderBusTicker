const pool = require("../db/connection");

const getAllRoutes = async () => {
  const [rows] = await pool.query(`
   SELECT 
        id, origin, destination, estimated_duration_minutes
    FROM routes
  `);
  return rows;
};

module.exports = {
  getAllRoutes,
};
