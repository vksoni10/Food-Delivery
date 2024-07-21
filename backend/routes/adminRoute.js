const express = require("express");
const {getUserProfile} = require('../controller/UserAdmin')
const {getRestProfile, deleteRestProfile} = require('../controller/RestAdmin')
const {getAllUserOrders} = require('../controller/AdminOrderController');
const {createUser, loginAdminCtrl} = require('../controller/AdminCtrl')

const authMiddleware = require('../middleware/AdminMiddleware');

const router = express.Router();

router.get('/users', getUserProfile);
router.get('/restaurantslist', getRestProfile);
router.delete('/deleteRestaurant/:id', deleteRestProfile);
router.post("/login", loginAdminCtrl);
router.post("/register", createUser);
router.get('/all', getAllUserOrders);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to the dashboard");   
  });

module.exports = router;