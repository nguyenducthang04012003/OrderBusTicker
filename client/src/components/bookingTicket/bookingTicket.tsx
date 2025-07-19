import React, { useState, useEffect } from "react";
import "./bookingTicket.css";
import API from "../../services/api";

type BookingTicketProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface Seat {
  seat_id: number;
  seat_number: number;
  seat_type: string;
  status: string;
}

const BookingTicket: React.FC<BookingTicketProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trip_id: "",
    seat_id: "",
  });
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isOpen || !formData.trip_id) return;

    const fetchSeat = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/seat/check-seat/${formData.trip_id}`);
        setSeats(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách ghế:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeat();
  }, [formData.trip_id]);

  if (!isOpen) return null;

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
        <h2>Đặt vé</h2>
        <hr />
        <p>Nhập thông tin cá nhân</p>
        <form className="form_information" onSubmit={handleSubmit}>
          <div className="inpt_information">
            <label htmlFor="name">Họ và Tên:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inpt_information">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inpt_information">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inpt_information">
            <label htmlFor="trip_id">Mã xe:</label>
            <input
              id="trip_id"
              name="trip_id"
              type="text"
              value={formData.trip_id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="seat_id">Chọn ghế:</label>
            <select
              id="seat_id"
              name="seat_id"
              value={formData.seat_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn ghế --</option>
              {seats.map((seat) => (
                <option key={seat.seat_number} value={seat.seat_number}>
                  Ghế {seat.seat_number} ({seat.seat_type}) -{" "}
                  {seat.status === "available" ? "Trống" : "Đã đặt"}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="btn_infor">
          <button className="btn_submit" type="submit">
            Đặt vé
          </button>
          <button type="button" className="btn_close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
