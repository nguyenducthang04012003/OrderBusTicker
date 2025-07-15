const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");


router.post("/", ticketController.bookTicket);
router.get("/", ticketController.getAllTicket);
router.get("/by-phone", ticketController.getTicketsByPhoneNumber);

module.exports = router;
