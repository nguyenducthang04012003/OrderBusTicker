import React, { useEffect, useState } from "react";
import API from "../../services/api";

interface Seat {
  id: number;
  seat_number: number;
  seat_type: string;
  is_available: boolean;
}

interface Bus {
  id: number;
  license_plate: string;
  seat_count: number;
  bus_type: string;
}

function RouteList() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [busSeats, setBusSeats] = useState<{ [busId: number]: Seat[] }>({});
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  useEffect(() => {
    API.get("/buses")
      .then((res) => setBuses(res.data))
      .catch((err) => console.error("Lỗi gọi API danh sách bus:", err));
  }, []);

  const handleBusClick = async (busId: number) => {
    setSelectedBusId(busId);
    // Nếu ghế chưa được load thì mới gọi API
    if (!busSeats[busId]) {
      try {
        const res = await API.get(`/seat/${busId}`);
        setBusSeats((prev) => ({ ...prev, [busId]: res.data }));
      } catch (err) {
        console.error("Lỗi khi lấy danh sách ghế:", err);
      }
    }
  };

  return (
    <div>
      <h2>Danh sách xe bus</h2>
      <ul>
        {buses.map((bus) => (
          <li
            key={bus.id}
            onClick={() => handleBusClick(bus.id)}
            style={{ cursor: "pointer" }}
          >
            {bus.license_plate} → {bus.bus_type} ({bus.seat_count} chỗ)
          </li>
        ))}
      </ul>

      {selectedBusId && busSeats[selectedBusId] && (
        <div>
          <h3>Danh sách ghế xe {selectedBusId}</h3>
          <ul>
            {busSeats[selectedBusId].map((seat) => (
              <li key={seat.id}>
                Ghế {seat.seat_number} -{" "}
                {seat.is_available ? "Còn trống" : "Đã đặt"} ({seat.seat_type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RouteList;
