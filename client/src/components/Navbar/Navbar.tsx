// frontend/src/components/Navbar/Navbar.tsx

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); 

  const handleHomeClick = () => {
    navigate("/"); 
  };

  const handleRoutesClick = () => {
    navigate("/route"); 
  };

  const handleBusesClick = () => {
    navigate("/buses");
  };

  const handleTicketClick = () => {
    navigate("/checkticket");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Tên hoặc Logo của ứng dụng - Sử dụng onClick */}
        <div className="navbar-logo" onClick={handleLogoClick}>
          BusTicket
        </div>

        {/* Các mục điều hướng - Sử dụng onClick */}
        <ul className="nav-menu">
          <li className="nav-item">
            <div className="nav-links" onClick={handleHomeClick}>
              {" "}
              Trang chủ
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-links" onClick={handleRoutesClick}>
              {" "}
              Tuyến đường
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-links" onClick={handleBusesClick}>
              {" "}
              Danh sách xe
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-links" onClick={handleTicketClick}>
              {" "}
              Kiểm tra vé
            </div>
          </li>
          <li className="nav-item">
            <div className="btn_register" onClick={handleAboutClick}>
              {" "}
              <p className="txt_register">Đặt vé ngay</p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
