import React, { useEffect, useState } from "react";
import API from "../../services/api";

// Interface cho Route
interface Route {
  route_id: number;
  origin: string;
  destination: string;
  departure_time: string;
  estimated_duration_minutes: number;
  price: number;
}

const RouteList: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const [error, setError] = useState<string | null>(null); // Thêm trạng thái lỗi

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get("/routes");
        setRoutes(res.data);
      } catch (err) {
        console.error("Lỗi gọi API danh sách tuyến đường:", err);
        setError("Không thể tải danh sách tuyến đường. Vui lòng thử lại sau.");
      } finally {
        setLoading(false); // Kết thúc tải, dù thành công hay thất bại
      }
    };

    fetchRoutes();
  }, []); // [] đảm bảo hook chỉ chạy một lần khi component được mount

  return (
    <div>
      <h2>Danh sách tuyến đường</h2>
      {loading && <p>Đang tải danh sách tuyến đường...</p>}
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Sử dụng class để style lỗi */}
      {!loading && !error && routes.length === 0 && (
        <p>Không có tuyến đường nào được tìm thấy.</p>
      )}
      {!loading && !error && routes.length > 0 && (
        <ul>
          {routes.map((route) => (
            <li key={route.route_id}>
              {route.origin} &rarr; {route.destination} (
              {route.estimated_duration_minutes} phút) ({route.price} VNĐ) (
              {route.departure_time})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RouteList;
