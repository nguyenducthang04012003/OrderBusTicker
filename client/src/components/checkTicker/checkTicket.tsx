import React, { useState } from "react";
import "./checkTicket.css";
import API from "../../services/api";

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
  const [message, setMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setTickets([]);
    setCurrentPage(1);

    if (!phoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      setLoading(false);
      return;
    }

    try {
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
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm vé. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTicketStatusDisplay = (status: string) => {
    switch (status) {
      case "booked":
        return { label: "Đã đặt", color: "orange" };
      case "paid":
        return { label: "Đã thanh toán", color: "green" };
      default:
        return { label: status, color: "gray" };
    }
  };

  return (
    <div className="checkticker_container">
      <h2 className="tittle_checkticket">Kiểm tra thông tin vé</h2>
      <hr />
      <form onSubmit={handleSearch} className="checkticker_form">
        <div className="form_group">
          <label htmlFor="phoneNumberInput" className="phoneNumberInput">
            Số điện thoại:
          </label>
          <input
            type="tel"
            id="phoneNumberInput"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Ví dụ: 0912345678"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn_checkticket">
          {loading ? "Đang tìm..." : "Tìm kiếm vé"}
        </button>
      </form>
      <h2 className="tittle_checkticket">Thông tin vé</h2>

      {error && <p className="error_message">{error}</p>}
      {message && <p className="info_message">{message}</p>}

      {currentTickets.length > 0 && (
        <div className="ticket_results">
          {currentTickets.map((ticket) => {
            const { label, color } = getTicketStatusDisplay(
              ticket.ticketStatus
            );

            return (
              <div key={ticket.ticketId} className="ticket_card">
                <h4 className="ticket_card__id">Thông tin khách hàng</h4>

                <p className="ticket_card__user">
                  <strong className="ticket_card__label">Khách hàng:</strong>{" "}
                  {ticket.userName}
                </p>

                <p className="ticket_card__email">
                  <strong className="ticket_card__label">
                    Số điện thoại:{" "}
                  </strong>
                  {ticket.userPhone}
                </p>

                <p className="ticket_card__route">
                  <strong className="ticket_card__label">Tuyến:</strong>{" "}
                  {ticket.routeOrigin} &rarr; {ticket.routeDestination} (
                  {ticket.routeDuration} phút)
                </p>

                <p className="ticket_card__departure">
                  <strong className="ticket_card__label">
                    Thời gian khởi hành:
                  </strong>{" "}
                  {ticket.tripDepartureTime}
                </p>

                <p className="ticket_card__price">
                  <strong className="ticket_card__label">Giá:</strong>{" "}
                  {ticket.tripPrice.toLocaleString("vi-VN")} VNĐ
                </p>

                <p className="ticket_card__bus">
                  <strong className="ticket_card__label">Xe:</strong>{" "}
                  {ticket.busLicensePlate} ({ticket.busType})
                </p>

                <p className="ticket_card__seat">
                  <strong className="ticket_card__label">Ghế:</strong> Số{" "}
                  {ticket.seatNumber} ({ticket.seatType})
                </p>

                <p className="ticket_card__status">
                  <strong className="ticket_card__label">Trạng thái vé: </strong>{" "}
                  <span style={{ color, fontSize:"20px" }}>{label}</span>
                </p>

                <p className="ticket_card__booked-at">
                  <strong className="ticket_card__label">Đặt lúc:</strong>{" "}
                  {new Date(ticket.bookedAt).toLocaleString("vi-VN")}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination_controls">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination_button ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {!loading &&
        tickets.length === 0 &&
        !error &&
        phoneNumber.trim() &&
        message && (
          <p className="info_message">
            Không tìm thấy vé nào phù hợp với số điện thoại đã nhập.
          </p>
        )}
    </div>
  );
};

export default CheckTicker;
