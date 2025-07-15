import React, { useEffect, useState } from "react";
import API from "../../services/api";

interface Ticket {
  ticketId: number; // Đổi từ 'id' sang 'ticketId' để khớp với TicketModel.js
  userName: string; // Đổi từ 'user_name' sang 'userName'
  destination: string; // Tên tuyến điểm đến
  seatNumber: number; // Đổi từ 'seat_number' sang 'seatNumber'
  ticketStatus: "booked" | "cancelled" | "paid"; // Đổi từ 'status' sang 'ticketStatus'
  bookedAt: string; // Đổi từ 'Date' sang 'string' vì API thường trả về dạng chuỗi ISO
  routeDestination: string;
  userPhone: string;
  tripDepartureTime: string;
  tripPrice: number;
  busLicensePlate: string;
  busType: string;
  seatType: string;
  routeOrigin: string;
  routeDuration: number;
}

// Chuyển từ function RouteList() sang const TicketList: React.FC = () => {}
// Đổi tên component thành TicketList để phản ánh dữ liệu nó hiển thị
const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]); // Đổi tên state từ 'ticket' sang 'tickets' (số nhiều)
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const [error, setError] = useState<string | null>(null); // Thêm trạng thái lỗi

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true); // Bắt đầu tải
      setError(null); // Xóa lỗi cũ
      try {
        const res = await API.get("/ticket"); // Endpoint là /tickets cho getAllTickets
        setTickets(res.data);
      } catch (err) {
        console.error("Lỗi gọi API danh sách vé:", err); // Cập nhật log lỗi
        setError("Không thể tải danh sách vé. Vui lòng thử lại sau.");
      } finally {
        setLoading(false); // Kết thúc tải, dù thành công hay thất bại
      }
    };

    fetchTickets();
  }, []); // [] đảm bảo hook chỉ chạy một lần khi component được mount

  return (
    <div>
      <h2>Danh sách vé đã đặt</h2> {/* Cập nhật tiêu đề */}
      {loading && <p>Đang tải danh sách vé...</p>}
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Sử dụng class để style lỗi */}
      {!loading && !error && tickets.length === 0 && (
        <p>Không có vé nào được tìm thấy.</p>
      )}
      {!loading && !error && tickets.length > 0 && (
        <ul>
          {tickets.map(
            (
              ticketItem // Đổi tên biến lặp thành ticketItem để tránh trùng với state 'tickets'
            ) => (
              <li key={ticketItem.ticketId}>
                {" "}
                {/* Đổi key từ route.id sang ticketItem.ticketId */}
                <strong>Mã vé:</strong> {ticketItem.ticketId} <br />
                <strong>Khách hàng:</strong> {ticketItem.userName} (
                {ticketItem.userPhone}) <br />
                <strong>Tuyến:</strong> {ticketItem.routeOrigin} &rarr;
                {ticketItem.routeDestination}
                {ticketItem.destination} <br />
                <strong>Ghế:</strong> {ticketItem.seatNumber} <br />
                <strong>Trạng thái:</strong> {ticketItem.ticketStatus} <br />
                <strong>Đặt lúc:</strong>{" "}
                {new Date(ticketItem.bookedAt).toLocaleString("vi-VN")}
                <hr /> {/* Thêm đường kẻ ngang để phân biệt các vé */}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default TicketList; // Export component với tên mới
