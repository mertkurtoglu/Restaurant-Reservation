const mongoose = require("mongoose");

const openingHoursSchema = new mongoose.Schema({
  day: String, // Gün (örneğin: "Monday", "Tuesday", "Wednesday", ...)
  openingTime: String, // Açılış saati (örneğin: "09:00 AM")
  closingTime: String, // Kapanış saati (örneğin: "06:00 PM")
});

const RestaurantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  branch: { type: String, required: false },
  openingHours: [openingHoursSchema],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema, "restaurants");
