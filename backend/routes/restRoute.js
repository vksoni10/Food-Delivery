const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, loginResCtrl } = require("../controller/ResCtrl");

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginResCtrl);

module.exports = router;
