import React, { useEffect, useState } from "react";
import API from "../../services/api";

// Interface cho Seat
interface Seat {
  id: number;
  seat_number: number;
  seat_type: string;
  is_available: boolean;
}

// Interface cho Bus
interface Bus {
  id: number;
  license_plate: string;
  seat_count: number;
  bus_type: string;
}

const RouteList: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [busSeats, setBusSeats] = useState<{ [busId: number]: Seat[] }>({});
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  // useEffect để gọi API lấy danh sách bus khi component mount
  useEffect(() => {
    API.get("/buses")
      .then((res) => setBuses(res.data))
      .catch((err) => console.error("Lỗi gọi API danh sách bus:", err));
  }, []); // [] đảm bảo hook chỉ chạy một lần khi component được mount

  // Hàm xử lý khi click vào một bus
  const handleBusClick = async (busId: number) => {
    setSelectedBusId(busId);
    // Nếu danh sách ghế của bus này chưa được load (không có trong busSeats state)
    // thì mới gọi API để lấy danh sách ghế.
    if (!busSeats[busId]) {
      try {
        const res = await API.get(`/seat/${busId}`);
        setBusSeats((prev) => ({ ...prev, [busId]: res.data }));
      } catch (err) {
        console.error(`Lỗi khi lấy danh sách ghế cho bus ID ${busId}:`, err);
      }
    }
  };

  return (
    <div>
      <h2>Danh sách xe bus</h2>
      {/* Hiển thị thông báo nếu đang tải hoặc không có bus */}
      {buses.length === 0 ? (
        <p>Đang tải danh sách bus hoặc không có bus nào.</p>
      ) : (
        <ul>
          {buses.map((bus) => (
            <li
              key={bus.id}
              onClick={() => handleBusClick(bus.id)}
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                margin: "5px 0",
                backgroundColor:
                  selectedBusId === bus.id ? "#e6f7ff" : "#f0f0f0",
                border:
                  selectedBusId === bus.id
                    ? "1px solid #91d5ff"
                    : "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {bus.license_plate} &rarr; {bus.bus_type} ({bus.seat_count} chỗ)
            </li>
          ))}
        </ul>
      )}

      {/* Hiển thị danh sách ghế nếu một bus đã được chọn và ghế của nó đã được tải */}
      {selectedBusId !== null && (
        <div>
          <h3>
            Danh sách ghế xe{" "}
            {buses.find((bus) => bus.id === selectedBusId)?.license_plate ||
              selectedBusId}
          </h3>
          {busSeats[selectedBusId] ? (
            <ul>
              {busSeats[selectedBusId].map((seat) => (
                <li
                  key={seat.id}
                  style={{ color: seat.is_available ? "green" : "red" }}
                >
                  Ghế {seat.seat_number} -{" "}
                  {seat.is_available ? "Còn trống" : "Đã đặt"} ({seat.seat_type}
                  )
                </li>
              ))}
            </ul>
          ) : (
            <p>Đang tải danh sách ghế...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteList;
