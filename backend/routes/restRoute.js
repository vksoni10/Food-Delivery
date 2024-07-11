const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rest = require("../model/Resmodel");
const { addReview, getReviewsByRestaurant } = require('../controller/reviewCtrl');
const {
  createUser,
  loginResCtrl,
  getAllRestaurants,
  getRestroDetails,
} = require("../controller/ResCtrl");
const { getMenu } = require("../controller/menuCtrl");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginResCtrl);
router.get("/restaurants", getAllRestaurants);
router.get("/:id/menuItems", getMenu);
router.get("/:id", getRestroDetails);
router.post('/add-review', addReview);
router.get('/reviews/:restaurant_id', getReviewsByRestaurant);

module.exports = router;
