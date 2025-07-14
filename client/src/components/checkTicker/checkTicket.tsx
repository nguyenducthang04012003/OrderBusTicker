import React, { useState } from "react"; // Không cần useEffect ở đây cho việc tìm kiếm
import axios from "axios"; // Vẫn cần axios nếu API không dùng instance riêng
import "./checkTicket.css"; // Tạo file CSS này nếu muốn tùy chỉnh giao diện
import API from "../../services/api"; // Import API instance của bạn

// Interface (kiểu dữ liệu) cho mỗi đối tượng vé trả về từ API
// Đảm bảo các tên trường này khớp với các alias bạn đã định nghĩa trong TicketModel.js
interface Ticket {
  ticketId: number;
  ticketStatus: string;
  bookedAt: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  tripDepartureTime: string;
  tripPrice: number;
  busLicensePlate: string;
  busType: string;
  seatNumber: number;
  seatType: string;
  routeOrigin: string;
  routeDestination: string;
  routeDuration: number;
}

const CheckTicker: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Để hiển thị thông báo "Không tìm thấy vé"

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form (reload trang)
    setLoading(true);
    setError(null);
    setMessage(null);
    setTickets([]); // Xóa kết quả cũ mỗi khi tìm kiếm mới

    if (!phoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      setLoading(false);
      return;
    }

    try {
      // Gọi API backend của bạn bằng instance API đã import
      // Sử dụng template literals để truyền phoneNumber vào URL
      const response = await API.get(
        `/ticket/by-phone?phoneNumber=${phoneNumber}`
      );

      if (response.data.length === 0) {
        setMessage("Không tìm thấy vé nào với số điện thoại này.");
      } else {
        setTickets(response.data);
      }
    } catch (err: any) {
      console.error("Lỗi khi tìm kiếm vé:", err);
      if (err.response && err.response.data && err.response.data.message) {
        // Lấy message lỗi từ backend (ví dụ: "Không tìm thấy vé nào...")
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm vé. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkticker-container">
      <h2>Kiểm tra thông tin vé</h2>
      <form onSubmit={handleSearch} className="checkticker-form">
        <div className="form-group">
          <label htmlFor="phoneNumberInput">Số điện thoại:</label>
          <input
            type="tel" // Sử dụng type="tel" cho số điện thoại
            id="phoneNumberInput"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Ví dụ: 0912345678"
            required // Trường bắt buộc
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang tìm..." : "Tìm kiếm vé"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="info-message">{message}</p>}

      {tickets.length > 0 && (
        <div className="ticket-results">
          <h3>Các vé đã đặt:</h3>
          {tickets.map((ticket) => (
            <div key={ticket.ticketId} className="ticket-card">
              <h4>Mã vé: {ticket.ticketId}</h4>
              <p>
                <strong>Khách hàng:</strong> {ticket.userName} (
                {ticket.userPhone})
              </p>
              <p>
                <strong>Email:</strong> {ticket.userEmail}
              </p>
              <p>
                <strong>Tuyến:</strong> {ticket.routeOrigin} &rarr;{" "}
                {ticket.routeDestination} ({ticket.routeDuration} phút)
              </p>
              <p>
                <strong>Thời gian khởi hành:</strong>{" "}
                {new Date(ticket.tripDepartureTime).toLocaleString("vi-VN")}
              </p>
              <p>
                <strong>Giá:</strong> {ticket.tripPrice.toLocaleString("vi-VN")}{" "}
                VNĐ
              </p>
              <p>
                <strong>Xe:</strong> {ticket.busLicensePlate} ({ticket.busType})
              </p>
              <p>
                <strong>Ghế:</strong> Số {ticket.seatNumber} ({ticket.seatType})
              </p>
              <p>
                <strong>Trạng thái vé:</strong> {ticket.ticketStatus}
              </p>
              <p>
                <strong>Đặt lúc:</strong>{" "}
                {new Date(ticket.bookedAt).toLocaleString("vi-VN")}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Hiển thị khi không có vé và không có lỗi, không có loading, và người dùng đã nhập số điện thoại */}
      {!loading &&
        tickets.length === 0 &&
        !error &&
        phoneNumber.trim() &&
        message && (
          <p className="info-message">
            Không tìm thấy vé nào phù hợp với số điện thoại đã nhập.
          </p>
        )}
    </div>
  );
};

export default CheckTicker;
