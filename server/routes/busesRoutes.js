const express = require("express");
const router = express.Router();
const busesController = require("../controllers/busesController");

router.get("/", busesController.getallBuses);

module.exports = router;
