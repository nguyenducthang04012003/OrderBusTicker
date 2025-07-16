// frontend/src/components/Navbar/Navbar.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import BookingTicket from "../bookingTicket/bookingTicket";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            BusTicket
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <div className="nav-links" onClick={() => navigate("/")}>
                Trang chủ
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => navigate("/route")}>
                Tuyến đường
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links" onClick={() => navigate("/buses")}>
                Danh sách xe
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                onClick={() => navigate("/checkticket")}
              >
                Kiểm tra vé
              </div>
            </li>
            <li className="nav-item">
              <button
                className="btn_register"
                onClick={() => setIsModalOpen(true)}
              >
                <p className="txt_register">Đặt vé ngay</p>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal được render tách riêng bên ngoài nav */}
      <BookingTicket
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
