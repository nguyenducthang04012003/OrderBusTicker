import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./homePage.css";
import {
  faArrowsUpDown,
  faCircleCheck,
  faFileInvoiceDollar,
  faHandshake,
  faHeadset,
  faLocationDot,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="head-homepage">
        <img className="img-home" src="img/img.webp" alt="logo" />
        <div className="information-head">
          <p className="txt-head">
            Dùng chữ “<span className="highlightred-route">Tâm</span>” để phục
            vụ
          </p>
          <p className="txt-head">
            Lấy chữ “<span className="highlightred-route">Tín</span>” để phát
            triển
          </p>
          <hr />
          <p className="txt-head">
            Chuyên tuyến{" "}
            <span className="highlight-route">NGHỆ AN - HÀ NỘI</span>
          </p>
          <p className="txt-head">
            Xe khách:{" "}
            <span className="highlight-route">
              An toàn - Tiện lợi - Thoải mái
            </span>
          </p>
          <hr />
          <p className="txt-head">
            HostLine: <span className="highlight-route">09999999999</span>
          </p>
        </div>
        <div className="bottom-head">
          <div className="item-bottom">
            <FontAwesomeIcon icon={faCircleCheck} color="yellow" />
            <p>Chắc chắn có chỗ</p>
          </div>
          <div className="item-bottom">
            <FontAwesomeIcon icon={faHeadset} color="yellow" />
            <p>Hỗ trợ 24/7</p>
          </div>
          <div className="item-bottom">
            <FontAwesomeIcon icon={faHandshake} color="yellow" />
            <p>Dễ dàng nhanh chóng</p>
          </div>
          <div className="item-bottom">
            <FontAwesomeIcon icon={faFileInvoiceDollar} color="yellow" />
            <p>Thanh toán đa dạng</p>
          </div>
        </div>
      </div>
      <div className="body-homepage">
        <p className="body-homepage__title">Lộ trình phổ biến</p>
        <div className="popular-routes-container">
          <div className="route-item">
            <img className="route-item__image" src="img/img1.webp" alt="bus1" />
            <div className="route-item__type">
              <p className="route-item__type-text">Limousine</p>
            </div>

            <div className="route-item__location">
              <p className="route-item__location-origin">
                <FontAwesomeIcon icon={faLocationDot} />
                Nghệ An
              </p>
              <FontAwesomeIcon icon={faArrowsUpDown} />
              <p className="route-item__location-destination">
                <FontAwesomeIcon icon={faMapLocation} />
                Hà Nội
              </p>
            </div>

            <div className="route-item__price">
              <p className="route-item__price-text">Giá vé: 250.000 VND</p>
            </div>
          </div>
          <div className="route-item">
            <img className="route-item__image" src="img/img2.webp" alt="bus1" />
            <div className="route-item__type">
              <p className="route-item__type-text">Limousine</p>
            </div>

            <div className="route-item__location">
              <p className="route-item__location-origin">
                {" "}
                <FontAwesomeIcon icon={faLocationDot} />
                Nghệ An
              </p>
              <FontAwesomeIcon
                icon={faArrowsUpDown}
                className="route-item__icon"
              />
              <p className="route-item__location-destination">
                {" "}
                <FontAwesomeIcon icon={faMapLocation} />
                Hà Nội
              </p>
            </div>

            <div className="route-item__price">
              <p className="route-item__price-text">Giá vé: 250.000 VND</p>
            </div>
          </div>
          <div className="route-item">
            <img className="route-item__image" src="img/img3.webp" alt="bus1" />
            <div className="route-item__type">
              <p className="route-item__type-text">Limousine</p>
            </div>

            <div className="route-item__location">
              <p className="route-item__location-origin">
                {" "}
                <FontAwesomeIcon icon={faLocationDot} />
                Nghệ An
              </p>
              <FontAwesomeIcon
                icon={faArrowsUpDown}
                className="route-item__icon"
              />
              <p className="route-item__location-destination">
                {" "}
                <FontAwesomeIcon icon={faMapLocation} />
                Hà Nội
              </p>
            </div>

            <div className="route-item__price">
              <p className="route-item__price-text">Giá vé: 250.000 VND</p>
            </div>
          </div>
          <div className="route-item">
            <img className="route-item__image" src="img/img1.webp" alt="bus1" />
            <div className="route-item__type">
              <p className="route-item__type-text">Limousine</p>
            </div>

            <div className="route-item__location">
              <p className="route-item__location-origin">
                {" "}
                <FontAwesomeIcon icon={faLocationDot} />
                Nghệ An
              </p>
              <FontAwesomeIcon
                icon={faArrowsUpDown}
                className="route-item__icon"
              />
              <p className="route-item__location-destination">
                {" "}
                <FontAwesomeIcon icon={faMapLocation} />
                Hà Nội
              </p>
            </div>

            <div className="route-item__price">
              <p className="route-item__price-text">Giá vé: 250.000 VND</p>
            </div>
          </div>
        </div>
      </div>
      <div className="service_container">
        <p className="tiltle_service">Dịch vụ hàng hoá</p>
        <div className="service_content">
          <div className="service_container_item">
            <img
              className="route-item__image"
              src="img/employee.jpeg"
              alt="employee"
            />
            <p className="txt_item">Bồi thường thất lạc</p>
            <p className="txt2_item">
              Khách hàng sẽ nhận bồi thường khi hàng bị mất, thiếu hoặc hỏng hóc
            </p>
          </div>
          <div className="service_container_item">
            <img
              className="route-item__image"
              src="img/employee1.jpg"
              alt="employee"
            />
            <p className="txt_item">Giao hoả tốc</p>
            <p className="txt2_item">
              Đảm bảo giao hàng trong vòng 3 giờ trong khu vực nội thành Hà Nội
            </p>
          </div>
          <div className="service_container_item">
            <img
              className="route-item__image"
              src="img/employee1.jpg"
              alt="employee"
            />
            <p className="txt_item">Thu hộ</p>
            <p className="txt2_item">
              Nhận thu hộ (COD) cho hàng hoá chuyển phát, chuyển tiền trong ngày
            </p>
          </div>
        </div>
      </div>
      <div className="service_container">
        <p className="tiltle_service">BỘ TIÊU CHUẨN NHÀ XE</p>
        <div className="service_content">
          <div className="regulations_container_item">
            <img
              className="route-item__image"
              src="img/regulations1.png"
              alt="employee"
            />
            <p className="txt_item regulations">Giá vé ổn định</p>
            <hr />
            <p className="txt2_item regulations">
              Cam kết bán đúng giá niêm yết, KHÔNG tăng giá dịp lễ Tết
            </p>
          </div>
          <div className="container_item">
            <img
              className="route-item__image"
              src="img/regulations2.png"
              alt="employee"
            />
            <p className="txt_item regulations">Hãng xe uy tín</p>
            <hr />
            <p className="txt2_item regulations">
              Xuất bến đúng giờ, cam kết KHÔNG đón khách dọc đường
            </p>
          </div>
          <div className="regulations_container_item">
            <img
              className="route-item__image"
              src="img/regulations3.png"
              alt="employee"
            />
            <p className="txt_item regulations">Giữ chỗ 100%</p>
            <hr />
            <p className="txt2_item regulations">
              Mọi hành khách đặt vé sẽ được giữ chỗ 100%, KHÔNG để khách nằm
              luồng
            </p>
          </div>
        </div>
      </div>
      <div className="author_design">
        <p className="author_txt">Website create by NguyenThang</p>
      </div>
    </div>
  );
};

export default HomePage;