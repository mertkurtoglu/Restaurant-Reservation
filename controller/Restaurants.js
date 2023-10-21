const Restaurant = require("../models/restaurant");

module.exports.getBranches = async (req, res) => {
  try {
    const response = await Restaurant.find();
    return res.status(200).json({
      message: "Restaurant list",
      restaurants: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while listing the restaurants." });
  }
};

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const updatedOpeningHours = req.body.openingHours;

  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: id },
      { openingHours: updatedOpeningHours },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.json({
      message: "Restaurant updated",
      updatedRestaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
