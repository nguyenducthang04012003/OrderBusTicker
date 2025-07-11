// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteList from "./page/RouteList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/route" element={<RouteList />} />
        <Route
          path="/"
          element={
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h1>Trang chính</h1>
              <a href="/route">Xem danh sách tuyến đường</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
