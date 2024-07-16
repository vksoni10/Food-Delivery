// routes/restaurantRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { restaurantAdd, updateMenu } = require("../controller/ResCtrl");
const upload = require("../middleware/multer");
const uploader = require("../middleware/menuMulter");
const multer = require("multer");
const path = require("path");
const Restaurant = require("../model/Addrestaurant");
const fs = require("fs");
const router = express.Router();
const IMG_BASE_URL = "http://localhost:3001/static/";

// Register Route
router.post("/addRestaurant", upload.array("resImage", 3), restaurantAdd);
// router.post("/addRestaurant", restaurantAdd);

// Add menu item

router.post("/menu", uploader.single("dishImage"), updateMenu);
//Get menu items
router.get("/:resName/menu", async (req, res) => {
  const { resName } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ resName });
    //console.log("Restaurant fetched:", restaurant); // Log the fetched restaurant

    if (!restaurant) {
      console.log("Restaurant not found");
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItems = restaurant.menu;
    //console.log("Menu items aggregated:", menuItems); // Log the aggregated menu items

    if (!menuItems.length) {
      console.log("No menu items found");
      return res.status(404).json({ message: "No menu items found" });
    }

    res.json(menuItems);
  } catch (err) {
    console.error("Error fetching menu items:", err.message); // Log the error message
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:resName/menu/:itemId", async (req, res) => {
  const { resName, itemId } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ resName });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Find the index of the menu item to be removed
    const menuItemIndex = restaurant.menu.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (menuItemIndex === -1) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Remove the menu item from the menu array
    restaurant.menu.splice(menuItemIndex, 1);
    await restaurant.save();

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err.message); // Log the error message
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Get menu item by ID
router.get("/:resName/menu/:itemId", async (req, res) => {
  const { resName, itemId } = req.params;
  try {
    const restaurant = await Restaurant.findOne({ resName });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = restaurant.menu.id(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(menuItem);
  } catch (err) {
    console.error("Error fetching menu item:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.put(
  "/:resName/menu/:itemId",
  uploader.single("dishImage"),
  async (req, res) => {
    const { resName, itemId } = req.params;
    const { dishName, price, dishType } = req.body;
    const dishImage = IMG_BASE_URL + req.file.filename;

    try {
      const restaurant = await Restaurant.findOne({ resName });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      const menuItem = restaurant.menu.id(itemId);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      menuItem.dishName = dishName || menuItem.dishName;
      menuItem.price = price || menuItem.price;
      menuItem.dishType = dishType || menuItem.dishType;
      if (dishImage) {
        menuItem.dishImage = dishImage;
      }

      await restaurant.save();
      res.json(menuItem);
    } catch (err) {
      console.error("Error updating menu item:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

router.get("/review/:resName", async (req, res) => {
  const { resName } = req.params;
  try {
    const restaurant = await Restaurant.findOne({ resName });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const reviews = restaurant.resReview;
    res.json(reviews);
    console.log(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
