const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");

router.get("/", tripController.getAllTrips);
router.get("/route/:routeId", tripController.getTripIdByRoute);

module.exports = router;
