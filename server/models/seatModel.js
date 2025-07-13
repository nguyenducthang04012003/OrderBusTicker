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

module.exports = {
  getSeatsByBusId,
};


/**
 * Kiểm tra ghế có sẵn dựa trên seat_id và trip_id
 * @param {number} seatId - ID của ghế
 * @param {number} tripId - ID của chuyến xe
 * @returns {Promise<boolean>} Trả về true nếu ghế có sẵn, false nếu không
 */
const isSeatAvailable = async (seatId, tripId) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `
        SELECT s.is_available
        FROM seats s
        JOIN trips t ON s.bus_id = t.bus_id
        WHERE s.id = ? AND t.id = ? AND s.is_available = TRUE
      `,
      [seatId, tripId]
    );
    return rows.length > 0;
  } finally {
    connection.release();
  }
};

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
  isSeatAvailable,
  updateSeatAvailability,
};
