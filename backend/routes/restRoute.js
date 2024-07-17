const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rest = require("../model/Resmodel");
const { addReview, getReviewsByRestaurant  } = require('../controller/reviewCtrl');
const {  createUser,  loginResCtrl,  getAllRestaurants,  getRestroDetails, restLoginCtrl} = require("../controller/ResCtrl");
const { getMenu , restMenu} = require("../controller/menuCtrl");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginResCtrl);
router.post("/restlogin", restLoginCtrl);
router.get("/restaurants", getAllRestaurants);
router.get("/:id", getRestroDetails);
router.post('/add-review/:id', addReview);
router.get('/reviews/:id', getReviewsByRestaurant);
// router.post('/menu', addMenu)
router.get("/:id/menuItems", getMenu);
router.get("/menu/:resName", restMenu);

module.exports = router;
