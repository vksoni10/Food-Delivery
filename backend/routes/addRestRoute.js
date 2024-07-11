// routes/restaurantRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const restadd = require("../model/Addrestaurant");
const jwt = require("jsonwebtoken");
const { restaurantAdd } = require("../controller/ResCtrl");
const upload = require("../middleware/multer");

const router = express.Router();

// Register Route
router.post("/addRestaurant", upload.array("resImage", 3), restaurantAdd);
// router.post("/addRestaurant", restaurantAdd);

module.exports = router;
