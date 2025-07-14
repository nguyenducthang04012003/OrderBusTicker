import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./homePage.css";
import { faCircleCheck, faFileInvoiceDollar, faHandshake, faHeadset } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="head-homepage">
        <img className="img-home" src="img/img2.jpg" alt="logo" />
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
        <p>Lộ trình phổ biến</p>
        
      </div>
    </div>
  );
};

export default HomePage;
