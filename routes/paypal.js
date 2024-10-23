// routes/paypal.js
// // routes/paypal.js
const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');

// POST /api/paypal/create-order - Create a PayPal order
router.post('/create-order', paypalController.createPaypalOrder);

// POST /api/paypal/capture-order/:orderId - Capture a PayPal order
router.post('/capture-order/:orderId', paypalController.capturePaypalOrder);

module.exports = router;
