// routes/restaurantRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const restadd = require("../model/Addrestaurant");
const jwt = require("jsonwebtoken");
const { restaurantAdd } = require("../controller/ResCtrl");
const upload = require("../middleware/multer");
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Register Route
router.post("/addRestaurant", upload.array("resImage", 3), restaurantAdd);
// router.post("/addRestaurant", restaurantAdd);

router.post('/menu', async (req, res) => {
  const { menu} = req.body;

  try {
    
    const newRest = await restadd.create({ menu });
    res.json(newRest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
