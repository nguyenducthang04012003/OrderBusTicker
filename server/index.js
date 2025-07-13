const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const routeRoutes = require("./routes/routeRoutes");
app.use("/api/routes", routeRoutes);

const busesRoutes = require("./routes/busesRoutes");
app.use("/api/buses", busesRoutes);

const tripRoutes = require("./routes/tripRoute");
app.use("/api/trips", tripRoutes);

const ticketRoutes = require("./routes/ticketRoute");
app.use("/api/ticket", ticketRoutes);

const seatRoute = require("./routes/seatRoute");
app.use("/api/seat", seatRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
