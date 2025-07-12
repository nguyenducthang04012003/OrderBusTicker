// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RouteList from "./page/RouteList";
import BusesList from "./page/BussesList";
import HomePage from "./page/homePage";
import TicketPage from "./page/ticketPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/route" element={<RouteList />} />
          <Route path="/buses" element={<BusesList />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route
            path="/"
            element={
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <HomePage />
              </div>
            }
          />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;