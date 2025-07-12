import React, { useEffect, useState } from "react";
import API from "../services/api";

interface Ticket {
  id: number;
  user_name: string;
  destination: string;
  seat_number: number;
  status: "booked" | "cancelled" | "paid";
  booked_at: Date;
}

function RouteList() {
  const [ticket, setTicket] = useState<Ticket[]>([]);

  useEffect(() => {
    API.get("/ticket")
      .then((res) => setTicket(res.data))
      .catch((err) => console.error("Lỗi gọi API:", err));
  }, []);

  return (
    <div>
      <h2>Danh sách bus</h2>
      <ul>
        {ticket.map((route) => (
          <li key={route.id}>
            {route.user_name} → {route.destination} ({route.status} )
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RouteList;
