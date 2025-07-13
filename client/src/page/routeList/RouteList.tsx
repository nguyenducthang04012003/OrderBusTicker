import React, { useEffect, useState } from "react";
import API from "../../services/api";

interface Route {
  id: number;
  origin: string;
  destination: string;
  estimated_duration_minutes: number;
  price: number;
}

function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    API.get("/routes")
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error("Lỗi gọi API:", err));
  }, []);

  return (
    <div>
      <h2>Danh sách tuyến đường</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            {route.origin} → {route.destination} (
            {route.estimated_duration_minutes} phút) 
            ({route.price} VND)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RouteList;
