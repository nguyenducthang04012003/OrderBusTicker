// backend/models/TicketModel.js
// Đảm bảo rằng file này đang trỏ đến đúng connection pool của bạn
const pool = require("../db/connection");

/**
 * Tìm kiếm vé theo số điện thoại của người dùng.
 * @param {string} phoneNumber Số điện thoại của người dùng.
 * @returns {Array<object>} Mảng các vé tìm được.
 */
const findTicketsByPhoneNumber = async (phoneNumber) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
          t.id AS ticketId,
          t.status AS ticketStatus,
          t.booked_at AS bookedAt,
          u.name AS userName,
          u.email AS userEmail,
          u.phone AS userPhone,
          tr.departure_time AS tripDepartureTime,
          tr.price AS tripPrice,
          b.license_plate AS busLicensePlate,
          b.bus_type AS busType,
          s.seat_number AS seatNumber,
          s.seat_type AS seatType,
          r.origin AS routeOrigin,
          r.destination AS routeDestination,
          r.estimated_duration_minutes AS routeDuration
      FROM
          tickets t
      JOIN
          users u ON t.user_id = u.id
      JOIN
          trips tr ON t.trip_id = tr.id
      JOIN
          buses b ON tr.bus_id = b.id
      JOIN
          routes r ON b.route_id = r.id
      JOIN
          seats s ON t.seat_id = s.id
      WHERE
          u.phone = ?;
      `,
      [phoneNumber]
    );
    return rows;
  } catch (error) {
    console.error("Lỗi Model khi tìm kiếm vé theo số điện thoại:", error);
    throw error; // Ném lỗi để controller có thể bắt và xử lý
  }
};

/**
 * Tạo một vé đặt mới.
 * @param {number} user_id
 * @param {number} trip_id
 * @param {number} seat_id
 * @param {string} status
 * @returns {object} Thông tin kết quả insert (bao gồm insertId)
 */
const createTicket = async (user_id, trip_id, seat_id, status) => {
  const connection = await pool.getConnection(); // Lấy một kết nối từ pool
  try {
    await connection.beginTransaction(); // Bắt đầu giao dịch

    const [result] = await connection.query(
      `INSERT INTO tickets (user_id, trip_id, seat_id, status)
       VALUES (?, ?, ?, ?)`,
      [user_id, trip_id, seat_id, status]
    );

    await connection.commit(); // Hoàn tất giao dịch
    return result; // Trả về kết quả (thường chứa insertId)
  } catch (error) {
    await connection.rollback(); // Hoàn tác giao dịch nếu có lỗi
    console.error("Lỗi Model khi tạo vé mới:", error);
    throw error; // Ném lỗi để controller xử lý
  } finally {
    connection.release(); // Giải phóng kết nối về pool
  }
};

/**
 * Lấy tất cả các vé.
 * @returns {Array<object>} Mảng các vé với thông tin chi tiết.
 */
const getAllTickets = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT
          t.id AS ticketId,
          u.name AS userName,
          u.email AS userEmail,
          u.phone AS userPhone,
          tr.departure_time AS tripDepartureTime,
          tr.price AS tripPrice,
          b.license_plate AS busLicensePlate,
          b.bus_type AS busType,
          s.seat_number AS seatNumber,
          s.seat_type AS seatType,
          r.origin AS routeOrigin,
          r.destination AS routeDestination,
          r.estimated_duration_minutes AS routeDuration,
          t.status AS ticketStatus,
          t.booked_at AS bookedAt
      FROM tickets t
      JOIN users u ON t.user_id = u.id
      JOIN trips tr ON t.trip_id = tr.id
      JOIN buses b ON tr.bus_id = b.id
      JOIN routes r ON b.route_id = r.id
      JOIN seats s ON t.seat_id = s.id
      ORDER BY t.booked_at DESC
    `);
    return rows;
  } catch (error) {
    console.error("Lỗi Model khi lấy tất cả vé:", error);
    throw error; // Ném lỗi để controller xử lý
  }
};

// Export tất cả các hàm để có thể import và sử dụng chúng
module.exports = {
  findTicketsByPhoneNumber,
  createTicket,
  getAllTickets,
};
