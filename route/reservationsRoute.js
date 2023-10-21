const express = require("express");
const router = express.Router();
const Reservations = require("../controller/Reservations");

router.post("/reservation", Reservations.createRes);
router.get("/reservation", Reservations.listRes);
router.post("/reservation/:id", Reservations.confirmRes);

module.exports = router;
