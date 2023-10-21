const Reservation = require("../models/reservation");
const emailSender = require("../utils/emailSender");
const mongoose = require("mongoose");
const log = require("log-to-file");

module.exports.createRes = async (req, res) => {
  const timestamp = new Date(req.body.time);
  const formattedtime = timestamp.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

  const date = new Date(req.body.date);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("tr-TR", options);

  try {
    const reservation = new Reservation({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      branch: req.body.branch,
      date: formattedDate,
      time: formattedtime,
      note: req.body.note,
    });

    const response = await reservation.save();

    if (response) {
      const to = "mert.9635@gmail.com";
      const subject = "New Reservation";
      const text = `You have a new reservation. \n\nName: ${response.name} \nEmail: ${response.email} \nPhone: ${response.phone} \nBranch: ${response.branch} \nDate: ${response.date} \nTime: ${response.time} \nNote: ${response.note}`;

      emailSender.sendEmail(to, subject, text);
    }

    return res.status(201).json({
      message: "Reservation created successfully",
      createdReservation: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the reservation." });
  }
};

module.exports.listRes = async (req, res) => {
  try {
    const response = await Reservation.find();
    return res.status(200).json({
      message: "Reservation list",
      reservations: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while listing the reservations." });
  }
};

module.exports.confirmRes = async (req, res) => {
  const status = req.body.data.confirmed;
  try {
    const response = await Reservation.findOneAndUpdate({ _id: req.params.id }, { confirmed: status }, { new: true });

    if (response) {
      const to = response.email;
      const subject = "Reservation Confirmation";
      if (status === true) {
        var text = `Your reservation has been confirmed.. \n\nName: ${response.name} \nEmail: ${response.email} \nPhone: ${response.phone} \nBranch: ${response.branch} \nDate: ${response.date} \nTime: ${response.time} \nNote: ${response.note}`;
      } else {
        var text = `Your reservation has been cancelled.. \n\nName: ${response.name} \nEmail: ${response.email} \nPhone: ${response.phone} \nBranch: ${response.branch} \nDate: ${response.date} \nTime: ${response.time} \nNote: ${response.note}`;
      }
      emailSender.sendEmail(to, subject, text);
      const logText = `Reservation ${req.params.id} , ${response.name} has been ${status ? "confirmed" : "cancelled"}`;
      log(logText, "logs.txt");
    }

    return res.status(200).json({
      reservation: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while confirming the reservation." });
  }
};
