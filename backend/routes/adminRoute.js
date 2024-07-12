const express = require("express");
const {getUserProfile} = require('../controller/UserAdmin')
const {getRestProfile, deleteRestProfile} = require('../controller/RestAdmin')
const router = express.Router();

router.get('/users', getUserProfile);
router.get('/restaurantslist', getRestProfile);
router.delete('/deleteRestaurant/:id', deleteRestProfile);

module.exports = router;