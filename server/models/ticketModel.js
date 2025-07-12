const pool = require("../db/connection");

/**
 * Tạo một vé đặt mới.
 * @param {number} user_id
 * @param {number} trip_id
 * @param {number} seat_id
 * @param {string} status
 * @returns {object} Thông tin kết quả insert
 */
const createTicket = async (user_id, trip_id, seat_id, status) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO tickets (user_id, trip_id, seat_id, status)
       VALUES (?, ?, ?, ?)`,
      [user_id, trip_id, seat_id, status]
    );

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getAllTickets = async () => {
  const [rows] = await pool.query(`
    SELECT t.id, u.name as user_name, r.destination, s.seat_number, t.status, t.booked_at
    FROM tickets t
    JOIN users u ON t.user_id = u.id
    JOIN trips tr ON t.trip_id = tr.id
    JOIN buses b ON tr.bus_id = b.id
    JOIN routes r ON b.route_id = r.id
    JOIN seats s ON t.seat_id = s.id
    ORDER BY t.booked_at DESC
  `);
  return rows;
};

module.exports = {
  createTicket,
  getAllTickets,
};
