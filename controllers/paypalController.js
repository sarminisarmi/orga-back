// controllers/paypalController.js
const paypalClient = require('../config/paypal');
const Order = require('../models/order');
const paypal = require('@paypal/checkout-server-sdk');

// Create a PayPal order
exports.createPaypalOrder = async (req, res) => {
  const { products, totalPrice, customerName, address, phoneNumber } = req.body;

  // Validate products and totalPrice
  if (!products || !Array.isArray(products) || products.length === 0 || !totalPrice) {
    return res.status(400).send('Invalid products or total price');
  }

  // Create a new order in MongoDB
  const newOrder = new Order({
    customerName,
    address,
    phoneNumber,
    cart: products,
    totalPrice,
    status: 'Pending',
  });

  try {
    // Save the order to MongoDB
    const savedOrder = await newOrder.save();

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: totalPrice.toString(),
        },
      }],
    });

    const order = await paypalClient.execute(request);
    res.json({ paypalOrderId: order.result.id, orderId: savedOrder._id }); // Return both PayPal order ID and local order ID
  } catch (err) {
    console.error('Error creating PayPal order:', err);
    res.status(500).send('Error creating PayPal order');
  }
};

// Capture a PayPal order
exports.capturePaypalOrder = async (req, res) => {
  const { orderId } = req.params;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);

    // Update the order status in MongoDB
    await Order.findByIdAndUpdate(orderId, { status: capture.result.status });

    res.json(capture.result);
  } catch (err) {
    console.error('Error capturing PayPal order:', err);
    res.status(500).send('Error capturing PayPal order');
  }
};
