// routes/signupRoutes.js
const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupcontroller");

router.post("/signup", signupController.signup);

module.exports = router;
