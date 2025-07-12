const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");


router.post("/create", ticketController.bookTicket);
router.get("/", ticketController.getAllTicket);

module.exports = router;
