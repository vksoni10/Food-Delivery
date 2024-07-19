const Rest = require("../model/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const IMG_BASE_URL = "http://localhost:3001/static/";
const JWT_SECRET = "jwt-secret-key";

const createUser = async (req, res) => {
  const { aName, aEmail, aMobile, aPassword } = req.body;

  try {
    const existingUser = await Rest.findOne({
      $or: [{ aEmail }, { aMobile }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with the same email or phone number already exists",
      });
    }
    const hash = await bcrypt.hash(aPassword, 10);
    const newUser = await Rest.create({
      aName,
      aEmail,
      aMobile,
      aPassword: hash,
    });

    const token = jwt.sign(
      {
        aEmail: newUser.aEmail,
        aName: newUser.aName,
        id: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("ownerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Owner registration successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const loginAdminCtrl = async (req, res) => {
  const { aEmail, aPassword } = req.body;

  try {
    const Admin = await Rest.findOne({ aEmail });
    if (!Admin) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      aPassword,
      Admin.aPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        aEmail: Admin.aEmail,
        aName: Admin.aName,
        aMobile: Admin.aMobile,
        id: Admin._id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("ownerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  createUser,
  loginAdminCtrl
};
