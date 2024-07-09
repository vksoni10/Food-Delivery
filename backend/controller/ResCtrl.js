const Rest = require("../model/Resmodel");
// const { generateToken } = require("../config/jwtToken");
const jwt = require("jsonwebtoken");
// const express = require("express");
const bcrypt = require("bcrypt");

const JWT_SECRET = "jwt-secret-key";
const createUser = async (req, res) => {
  const { rName, rEmail, rMobile, rPassword } = req.body;

  try {
    const existingRestaurant = await Rest.findOne({
      $or: [{ rEmail }, { rMobile }],
    });
    if (existingRestaurant) {
      return res.status(400).json({
        message: "User with the same email or phone number already exists",
      });
    }
    const hash = await bcrypt.hash(rPassword, 10);
    const newRestaurant = await Rest.create({
      rName,
      rEmail,
      rMobile,
      rPassword: hash,
    });
    res.json(newRestaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const loginResCtrl = async (req, res) => {
  const { rEmail, rPassword } = req.body;

  try {
    const Restaurant = await Rest.findOne({ rEmail });
    if (!Restaurant) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      rPassword,
      Restaurant.rPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        rEmail: Restaurant.rEmail,
        rName: Restaurant.rName,
        id: Restaurant._id,
      },
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
  }
};

module.exports = { createUser, loginResCtrl };
