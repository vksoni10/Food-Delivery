const restAdd = require("../model/Addrestaurant");
const jwt = require("jsonwebtoken");
const Cart = require('../model/Cartmodel')
const JWT_SECRET = "jwt-secret-key";

const addToCart = async (req, res) => {
  const { items } = req.body;
  const itemToAdd = items[0];

  try {
    // Find the menu item in the Resadd model
    const restaurant = await Resadd.findOne({ 'menu._id': itemToAdd._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const menuItem = restaurant.menu.id(itemToAdd._id);

    // Create the cart item
    const cartItem = {
      name: menuItem.dishName,
      quantity: itemToAdd.quantity,
      individualPrice: menuItem.price,
    };

    // Find the user's cart or create a new one
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    // Add item to cart
    cart.items.push(cartItem);
    await cart.save();

    return res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Error adding item to cart' });
  }
};

module.exports = {
  addToCart,
};