const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

let cartStore = {};

router.get('/', protect, (req, res) => {
  const cart = cartStore[req.user._id] || [];
  res.json(cart);
});

router.post('/', protect, (req, res) => {
  const { product, name, price, image, qty } = req.body;
  const userId = req.user._id.toString();

  if (!cartStore[userId]) {
    cartStore[userId] = [];
  }

  const existingIndex = cartStore[userId].findIndex(
    (item) => item.product === product
  );

  if (existingIndex > -1) {
    cartStore[userId][existingIndex].qty = qty;
  } else {
    cartStore[userId].push({ product, name, price, image, qty });
  }

  res.json(cartStore[userId]);
});

router.delete('/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  if (cartStore[userId]) {
    cartStore[userId] = cartStore[userId].filter(
      (item) => item.product !== req.params.productId
    );
  }
  res.json(cartStore[userId] || []);
});

router.delete('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  delete cartStore[userId];
  res.json([]);
});

module.exports = router;
