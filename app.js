const express = require("express");
const app = express();
const cors = require("cors");
const connectMongo = require("./db");

require("dotenv").config();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectMongo();

require("./route/routeManager")(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
