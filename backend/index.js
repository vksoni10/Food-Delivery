const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const UserModel = require("./model/UserModel");
const authRoutes = require("./routes/authRoute");
const RModel = require("./model/RModel");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/Food-delivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/auth", authRoutes); // Use the auth routes

app.listen("3001", () => {
  console.log("Server is running on port 3001");
  console.log("Mongodb is Connected");
});
