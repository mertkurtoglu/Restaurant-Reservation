const RestaurantsRouter = require("./restaurantsRoute");
const ReservationsRouter = require("./reservationsRoute");
const AuthRouter = require("./authRoute");

module.exports = function (app) {
  app.use("/", RestaurantsRouter);
  app.use("/", ReservationsRouter);
  app.use("/", AuthRouter);
};
