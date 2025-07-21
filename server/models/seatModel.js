// models/seatModel.js
const pool = require("../db/connection");

const getSeatsByBusId = async (busId) => {
  const [rows] = await pool.query(
    `
    SELECT id, bus_id, seat_number, seat_type, is_available
    FROM seats
    WHERE bus_id = ?
  `,
    [busId]
  );
  return rows;
};


const getSeatsByTripId = async (tripId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      s.id AS seat_id,
      s.seat_number,
      s.seat_type,
      CASE 
        WHEN t.id IS NOT NULL THEN 'booked'
        ELSE 'available'
      END AS status,
      tr.departure_time,
      tr.price
    FROM trips tr
    JOIN buses b ON tr.bus_id = b.id
    JOIN seats s ON s.bus_id = b.id
    LEFT JOIN tickets t ON t.seat_id = s.id AND t.trip_id = tr.id
    WHERE tr.id = ?
    ORDER BY s.seat_number
    `,
    [tripId]
  );
  return rows;
}

/**
 * Cập nhật trạng thái ghế (thường dùng khi đặt vé)
 * @param {number} seatId - ID của ghế
 * @param {boolean} isAvailable - Trạng thái mới của ghế
 * @returns {Promise<void>}
 */
const updateSeatAvailability = async (seatId, isAvailable) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query("UPDATE seats SET is_available = ? WHERE id = ?", [
      isAvailable ? 1 : 0,
      seatId,
    ]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getSeatsByBusId,
  getSeatsByTripId,
  updateSeatAvailability,
};
