const express = require("express");
const {getUserProfile} = require('../controller/UserAdmin')
const {getRestProfile, deleteRestProfile} = require('../controller/RestAdmin')
const {getAllUserOrders} = require('../controller/AdminOrderController');
// const AdminControl = require("../controller/AdminControl");

const authMiddleware = require('../middleware/AdminMiddleware');

const router = express.Router();

router.get('/users', getUserProfile);
router.get('/restaurantslist', getRestProfile);
router.delete('/deleteRestaurant/:id', deleteRestProfile);
// router.post("/signup", AdminControl.register);
// router.post("/login", AdminControl.login);
router.get('/all', getAllUserOrders);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to the dashboard");   
  });

module.exports = router;