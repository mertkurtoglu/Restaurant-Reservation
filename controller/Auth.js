const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        message: "Login failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};
