const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

router.get("/:busId", seatController.getSeatsByBus);
router.get("/check-seat", seatController.checkSeatAvailability);
router.post("/update-seat", seatController.updateSeat);

module.exports = router;
