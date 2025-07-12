import React, { useEffect, useState } from "react";
import API from "../services/api";
import RouteCard from "../components/RouteCard";

interface Route {
  id: number;
  origin: string;
  destination: string;
  estimated_duration_minutes: number;
  price: number;
}

const HomePage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    API.get("/routes")
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu tuyến đường:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tuyến đường phổ biến</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            origin={route.origin}
            destination={route.destination}
            estimatedDuration={route.estimated_duration_minutes}
            price={route.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
