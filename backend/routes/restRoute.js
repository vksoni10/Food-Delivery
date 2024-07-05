    <<<<<<< HEAD
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Resmodel = require('../model/Resmodel');
// const loginUserCtrl= require('../controller/userCtrl')

const router = express.Router();
const JWT_SECRET = "jwt-secret-key";  // Ensure you have a strong secret key and store it securely

// Register route
router.post('/register', async (req, res) => {
  const { rName, rEmail, rMobile, rPassword } = req.body;

  try {
    const existingRestaurant = await Resmodel.findOne({ $or: [{ rEmail }, { rMobile }] });
    if (existingRestaurant) {
      return res.status(400).json({ message: 'User with the same email or phone number already exists' });
    }
    const hash = await bcrypt.hash(rPassword, 10);
    const newRestaurant = await Resmodel.create({ rName, rEmail, rMobile, rPassword: hash });
    res.json(newRestaurant);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// router.post('/login', loginUserCtrl);
// Login route
router.post('/login', async (req, res) => {
  const {rEmail, rPassword } = req.body;

  try {
    const Restaurant = await Resmodel.findOne({rEmail});
    if (!Restaurant) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(rPassword, Restaurant.rPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ rEmail: Restaurant.rEmail, rName: Restaurant.rName, id: Restaurant._id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
========
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RModel = require("../model/RModel");
//const loginResCtrl= require('../controller/ResCtrl')

const router = express.Router();
const JWT_SECRET = "jwt-secret-key"; // Ensure you have a strong secret key and store it securely

// Register route
router.post("/Restaurant/register", async (req, res) => {
  const { rName, rEmail, rMobile, rPassword } = req.body;

  try {
    const existingUser = await RModel.findOne({
      $or: [{ rEmail }, { rMobile }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with the same email or phone number already exists",
        });
    }
    const hash = await bcrypt.hash(rPassword, 10);
    const newUser = await RModel.create({
      rName,
      rEmail,
      rMobile,
      rPassword: hash,
    });
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});
//router.post('/login', loginUserCtrl);
// Login route
router.post("/Restaurant/login", async (req, res) => {
  const { rEmail, rPassword } = req.body;

  try {
    const user = await RModel.findOne({ rEmail });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(rPassword, user.rPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { rEmail: user.rEmail, rName: user.rName, id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
>>>>>>  > aace941ca26638802fe7c3f4e08b544cf00d84f6
  }
});

module.exports = router;
