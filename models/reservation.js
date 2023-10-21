const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  branch: { type: String, required: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String, required: false },
  confirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Reservation", ReservationSchema, "reservations");
