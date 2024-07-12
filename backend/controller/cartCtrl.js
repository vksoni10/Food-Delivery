const restAdd = require("../model/Addrestaurant");
const jwt = require("jsonwebtoken");
const Cart = require('../model/Cartmodel')
const JWT_SECRET = "jwt-secret-key";
const userAdd = require('../model/UserModel')

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

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.name === cartItem.name);
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }

    await cart.save();

    return res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Error adding item to cart' });
  }
};

const updateCart = async (req, res) => {
  const { items } = req.body;

  try {
    // Find the user's cart
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update the cart with the new quantities
    cart.items = items;

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Error updating cart' });
  }
};

const getCart = async (req, res) => {
  try {
    // Find the user's cart
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Error fetching cart' });
  }
};

module.exports = {
  addToCart,
  updateCart,
  getCart,
};
