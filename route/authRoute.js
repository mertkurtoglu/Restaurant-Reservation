const express = require("express");
const router = express.Router();
const Auth = require("../controller/Auth");

router.post("/login", Auth.login);

module.exports = router;
