import React from "react";

interface RouteCardProps {
  origin: string;
  destination: string;
  estimatedDuration: number;
  price: number;
}

const RouteCard: React.FC<RouteCardProps> = ({
  origin,
  destination,
  estimatedDuration,
  price,
}) => {
  return (
    <div className="rounded-xl border p-4 shadow hover:shadow-md transition-all bg-white">
      <h2 className="text-xl font-semibold">
        {origin} → {destination}
      </h2>
      <p>Thời gian dự kiến: {estimatedDuration} phút</p>
      <p>Giá vé từ: {price.toLocaleString()} đ</p>
    </div>
  );
};

export default RouteCard;
