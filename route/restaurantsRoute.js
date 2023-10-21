const express = require("express");
const router = express.Router();
const Restaurants = require("../controller/Restaurants");

router.get("/restaurants", Restaurants.getBranches);
router.put("/restaurants/:id", Restaurants.update);

module.exports = router;
