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
            itemRestro: restaurant.resName
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

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId)

    const cart = await cartModel.findOne({ _id: userId });

    // if (cart) {
    //     return res.status(404).json({ error: 'Cart not found' });
    // }

    res.json({ success: true, cart });
  } catch (err) {
    console.error('Error retrieving cart items:', err);
    res.status(500).json({ error: 'Failed to retrieve cart items', details: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { userId } = req.query;
    const { itemId } = req.params;
    console.log(req.query, req.params);

    // Find the user's cart
    let cart = await cartModel.findOne({ _id: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    // Save the updated cart
    const savedCart = await cart.save();

    res.json({ success: true, cart: savedCart });
  } catch (err) {
    console.error('Error deleting cart item:', err);
    res.status(500).json({ error: 'Failed to delete cart item', details: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { userId, itemId, action } = req.body;
    console.log(req.body);

    // Find the user's cart
    let cart = await cartModel.findOne({ _id: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the item in the cart and update its quantity
    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      item.quantity = Math.max(item.quantity - 1, 0);
      if (item.quantity === 0) {
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
      }
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Save the updated cart
    const savedCart = await cart.save();

    res.json({ success: true, cart: savedCart });
  } catch (err) {
    console.error('Error updating cart item quantity:', err);
    res.status(500).json({ error: 'Failed to update cart item quantity', details: err.message });
  }
};


module.exports = { addToCart, getCartItems, deleteItem ,updateItem};
