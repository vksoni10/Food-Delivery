const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rest = require("../model/Resmodel");
// const loginUserCtrl= require('../controller/userCtrl')

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/logout", logoutUserCtrl);

module.exports = router;
