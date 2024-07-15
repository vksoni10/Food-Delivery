// routes/restaurantRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { restaurantAdd, updateMenu} = require("../controller/ResCtrl");
const upload = require("../middleware/multer");
const uploader = require("../middleware/menuMulter");
const multer = require("multer");
const path = require('path');
const Restaurant = require("../model/Addrestaurant");
const fs = require('fs');
const router = express.Router();

// Register Route
router.post("/addRestaurant", upload.array("resImage", 3), restaurantAdd);
// router.post("/addRestaurant", restaurantAdd);

// Add menu item


router.post('/menu', uploader.single('dishImage'), updateMenu); 
//Get menu items
// router.get("/menu", async (req, res) => {
//   console.log("hello");
//   try {
//     const restaurants = await Restaurant.find();
//     console.log("Restaurants fetched:", restaurants); // Log the fetched restaurants
//     if (!restaurants) {
//       console.log("No restaurants found");
//       return res.status(404).json({ message: "No restaurants found" });
//     }
//     const menuItems = restaurants.reduce(
//       (acc, restaurant) => acc.concat(restaurant.menu),
//       []
//     );
//     console.log("Menu items aggregated:", menuItems); // Log the aggregated menu items
//     if (!menuItems.length) {
//       console.log("No menu items found");
//       return res.status(404).json({ message: "No menu items found" });
//     }
//     res.json(menuItems);
//   } catch (err) {
//     console.error("Error fetching menu items:", err.message); // Log the error message
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

//Get menu item by ID
// router.get("/menu/:id", async (req, res) => {
//   console.log("Received ID:", req.params.id);
//   try {
//     const restaurant = await Restaurant.findOne({ "menu._id": req.params.id });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Menu item not found" });
//     }
//     const item = restaurant.menu.id(req.params.id);
//     res.json(item);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

//Update menu item
// router.put("/menu/:id", async (req, res) => {
//   const { dishName, price, dishImage, dishType } = req.body;

//   try {
//     const restaurant = await Restaurant.findOne({ "menu._id": req.params.id });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const menuItem = restaurant.menu.id(req.params.id);
//     if (menuItem) {
//       menuItem.dishName = dishName;
//       menuItem.price = price;
//       menuItem.dishImage = dishImage;
//       menuItem.dishType = dishType;

//       await restaurant.save();
//       res.json(menuItem);
//     } else {
//       res.status(404).json({ message: "Menu item not found" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Delete menu item
// router.delete("/menu/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const restaurant = await Restaurant.findOne({ "menu._id": id });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const menuItem = restaurant.menu.id(id);
//     if (!menuItem) {
//       return res.status(404).json({ message: "Menu item not found" });
//     }

//     menuItem.remove();
//     await restaurant.save();

//     res.json({ message: "Menu item removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
