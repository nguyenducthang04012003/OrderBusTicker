// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RouteList from "./page/routeList/RouteList";
import BusesList from "./page/busList/BussesList";
import HomePage from "./page/homePage/homePage";
import TicketPage from "./page/ticketPage/ticketPage";
import CheckTicket from "./components/checkTicker/checkTicket";
import BookingTicket from "./components/bookingTicket/bookingTicket";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/route" element={<RouteList />} />
          <Route path="/buses" element={<BusesList />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/checkticket" element={<CheckTicket />} />
          <Route
            path="/bookingticket"
            element={<BookingTicket isOpen={true} onClose={() => {}} />}
          />

          <Route
            path="/"
            element={
              <div style={{ textAlign: "center" }}>
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