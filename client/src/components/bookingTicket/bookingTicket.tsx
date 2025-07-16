import React, { useState } from "react";
import "./bookingTicket.css";

type BookingTicketProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BookingTicket: React.FC<BookingTicketProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trip_id: "",
    seat_id: "",
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hrzx8r35-3001.asse.devtunnels.ms/api/ticket/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, status: "booked" }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Đặt vé thành công! 🎉");
        console.log("Kết quả:", result);
        onClose(); // đóng modal
      } else {
        alert(`Lỗi đặt vé: ${result.error || "Đã xảy ra lỗi"}`);
        console.error("Lỗi chi tiết:", result);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };


  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <h2>Nhập thông tin</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Tên:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Số điện thoại:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="trip_id">Trip ID:</label>
          <input
            id="trip_id"
            name="trip_id"
            type="text"
            value={formData.trip_id}
            onChange={handleChange}
            required
          />

          <label htmlFor="seat_id">Seat ID:</label>
          <input
            id="seat_id"
            name="seat_id"
            type="text"
            value={formData.seat_id}
            onChange={handleChange}
            required
          />

          <button type="submit">Đặt vé</button>
          <button type="button" className="btn-close" onClick={onClose}>
            Đóng
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingTicket;
