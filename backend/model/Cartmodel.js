const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the item schema
const ItemSchema = new Schema({
  name: { type: String, required: false },
  quantity: { type: Number, required: false },
  individualPrice: { type: Number, required: false }
});

// Define the cart schema
const CartSchema = new Schema({
  items: [ItemSchema],
  totalPrice: { type: Number, required: false, default: 0 }
});

// Middleware to calculate total price before saving the cart
CartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((total, item) => total + (item.quantity * item.individualPrice), 0);
  next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
