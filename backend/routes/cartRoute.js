const express = require('express');
// const cartCtrl = require('../controller/cartCtrl')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {addToCart, getCartItems} = require('../controller/cartCtrl')
// const {createCart, deleteCartItem, updateCartItem}=require('../controller/cartCtrl')

// router.get('/',createCart);

// // DELETE /api/cart/:itemId
// router.delete('/:itemId', deleteCartItem);

// router.patch('/:itemId', updateCartItem);

router.get('/get-cart-items', getCartItems);
router.post('/add-to-cart',addToCart);


module.exports= router;