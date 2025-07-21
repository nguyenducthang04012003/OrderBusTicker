import React, { useState, useEffect } from "react";
import "./bookingTicket.css";
import API from "../../services/api";
import { Alert } from "react-bootstrap";

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
interface Route {
  id: number;
  origin: string;
  destination: string;
  estimated_duration_minutes: number;
}
interface Trip {
  id: number;
  bus_id: number;
  departure_time: string;
  price: number;
}

const BookingTicket: React.FC<BookingTicketProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trip_id: "",
    seat_id: "",
    route_id: "",
  });

  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState<Route[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

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
    const fetchRoute = async () => {
      setLoading(true);
      try {
        const res = await API.get("/routes");
        setRoute(res.data);
      } catch (err) {
        console.log("Lỗi gọi API danh sách tuyến đường:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, []);

  useEffect(() => {
    if (!formData.route_id) return;

    const fetchTripsByRoute = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/trips/route/${formData.route_id}`);
        setTrips(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách chuyến đi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripsByRoute();
  }, [formData.route_id]);

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

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        trip_id: parseInt(formData.trip_id),
        seat_id: parseInt(formData.seat_id), 
      };

      const response = await fetch(
        "https://hrzx8r35-3001.asse.devtunnels.ms/api/ticket/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
            <label htmlFor="route_id">Chọn tuyến đường:</label>
            <select
              name="route_id"
              id="route_id"
              value={formData.route_id}
              onChange={handleChange}
              required
            >
              <option value="">--Chọn tuyến--</option>
              {route.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id}
                </option>
              ))}
            </select>
          </div>
          <div className="inpt_information">
            <label htmlFor="trip_id">Chọn xe:</label>
            <select
              name="trip_id"
              id="trip_id"
              value={formData.trip_id}
              onChange={handleChange}
              required
              disabled = {formData.route_id===""}
            >
              <option value="">--Chọn xe--</option>
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.bus_id}
                </option>
              ))}
            </select>
          </div>

          <div className="inpt_information">
            <label htmlFor="seat_id">Chọn ghế:</label>
            <select
              id="seat_id"
              name="seat_id"
              value={formData.seat_id}
              onChange={handleChange}
              required
              disabled={formData.trip_id.trim() === ""}
            >
              <option value="">-- Chọn ghế --</option>
              {seats.map((seat) => (
                <option
                  key={seat.seat_id}
                  value={seat.seat_id}
                  style={{
                    color:
                      seat.status === "available"
                        ? "green"
                        : "rgba(255, 0, 0, 0.5)",
                  }}
                  disabled={seat.status !== "available"}
                >
                  Ghế {seat.seat_number} -{" "}
                  {seat.status === "available" ? "Trống" : "Đã đặt"}
                </option>
              ))}
            </select>
          </div>
          <div className="btn_infor">
            <button className="btn_submit" type="submit">
              Đặt vé
            </button>
            <button type="button" className="btn_close" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingTicket;
