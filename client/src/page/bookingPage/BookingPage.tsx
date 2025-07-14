// frontend/src/pages/FindBookingPage.tsx

import React, { useState } from "react";
import axios from "axios"; // npm install axios để gọi API
import "./FindBookingPage.css"; // File CSS cho trang này (tùy chọn)

interface Booking {
  bookingCode: string;
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  bookingDate: string;
  selectedSeats: string[]; // Giả sử là mảng chuỗi JSON
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  departureDate: string;
  departureTime: string;
  basePrice: number;
  routeName: string;
  origin: string;
  destination: string;
  licensePlate: string;
  operatorName: string;
}

const FindBookingPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBookings([]); // Xóa kết quả cũ

    try {
      // Đảm bảo URL API khớp với backend của bạn
      const response = await axios.get(
        `http://localhost:5000/api/bookings/by-phone?phoneNumber=${phoneNumber}`
      );
      setBookings(response.data);
    } catch (err: any) {
      console.error("Lỗi khi tìm kiếm vé:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm vé. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-booking-container">
      <h1>Tìm kiếm vé của bạn</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="tel" // Sử dụng type="tel" cho số điện thoại
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Nhập số điện thoại của bạn"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang tìm..." : "Tìm kiếm vé"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {bookings.length > 0 && (
        <div className="booking-results">
          <h2>Vé đã đặt:</h2>
          {bookings.map((booking) => (
            <div key={booking.bookingCode} className="booking-card">
              <h3>Mã đặt vé: {booking.bookingCode}</h3>
              <p>
                <strong>Hành khách:</strong> {booking.passengerName} (
                {booking.passengerPhone})
              </p>
              <p>
                <strong>Chuyến đi:</strong> {booking.routeName} (
                {booking.origin} - {booking.destination})
              </p>
              <p>
                <strong>Ngày/Giờ khởi hành:</strong>{" "}
                {new Date(booking.departureDate).toLocaleDateString()} lúc{" "}
                {booking.departureTime}
              </p>
              <p>
                <strong>Biển số xe:</strong> {booking.licensePlate}
              </p>
              <p>
                <strong>Nhà xe:</strong> {booking.operatorName}
              </p>
              <p>
                <strong>Ghế đã chọn:</strong>{" "}
                {booking.selectedSeats
                  ? JSON.parse(booking.selectedSeats.toString()).join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {booking.totalAmount.toLocaleString("vi-VN")} VNĐ
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong> {booking.paymentStatus}
              </p>
              <p>
                <strong>Trạng thái đặt vé:</strong> {booking.bookingStatus}
              </p>
            </div>
          ))}
        </div>
      )}

      {bookings.length === 0 && !loading && !error && phoneNumber && (
        <p>Không tìm thấy vé nào với số điện thoại này.</p>
      )}
    </div>
  );
};

export default FindBookingPage;
