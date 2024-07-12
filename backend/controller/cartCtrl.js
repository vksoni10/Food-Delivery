const restAdd = require("../model/Addrestaurant");
const jwt = require("jsonwebtoken");
const productModel = require('../model/Addrestaurant'); // Replace with your product model file path
const userModel = require('../model/UserModel'); // Replace with your user model file path
const cartModel = require('../model/Cartmodel'); // Replace with your cart model file path

const addToCart = async (req, res) => {
  try {
    const { resId, dishName, email } = req.body;
    console.log(req.body)
    

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Find the restaurant
    const restaurant = await productModel.findById(resId);
    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Find the menu item (dish) within the restaurant's menu
    const menuItem = restaurant.menu.find(item => item.dishName === dishName);
    if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
    }

    // Find or create the cart for the user
    let cart = await cartModel.findOne({ _id: user._id });
    if (!cart) {
        cart = new cartModel({ _id: user._id, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.name == menuItem.dishName);

    if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += 1;
    } else {
        // Add the menu item to the cart
        cart.items.push({

            productId: menuItem._id,
            name: menuItem.dishName,
            quantity: 1,
            individualPrice: menuItem.price,
        });
    }

    // Save the cart
    const savedCart = await cart.save();

    res.json({ success: true, cart: savedCart });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

const getCartItems = async (req,res)=>{
  
};

module.exports = { addToCart };
