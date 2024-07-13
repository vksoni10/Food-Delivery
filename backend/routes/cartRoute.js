const express = require('express');
// const cartCtrl = require('../controller/cartCtrl')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {addToCart, getCartItems} = require('../controller/cartCtrl')


router.get('/get-cart-items', getCartItems);
router.post('/add-to-cart',addToCart);


module.exports= router;