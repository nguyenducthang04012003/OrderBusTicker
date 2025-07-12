import React, { useEffect, useState } from "react";
import API from "../services/api";

interface Buses {
  id: number;
  license_plate: string;
  seat_count: number;
  bus_type: string;
}

function RouteList() {
  const [buses, setBuses] = useState<Buses[]>([]);

  useEffect(() => {
    API.get("/buses")
      .then((res) => setBuses(res.data))
      .catch((err) => console.error("Lỗi gọi API:", err));
  }, []);

  return (
    <div>
      <h2>Danh sách bus</h2>
      <ul>
        {buses.map((route) => (
          <li key={route.id}>
            {route.license_plate} → {route.bus_type} ({route.seat_count} )
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RouteList;
