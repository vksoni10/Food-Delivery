const express = require("express");
const {getUserProfile} = require('../controller/UserAdmin')
const router = express.Router();

router.get('/users', getUserProfile);

module.exports = router;