const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Ensure this path is correct

// POST route to create a new order
router.post('/orders', async (req, res) => {
  const { customerName, address, phoneNumber, products, totalPrice } = req.body;

  const order = new Order({
    customerName,
    address,
    phoneNumber,
    products,
    totalPrice,
  });

  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});



// GET /api/orders - Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product');
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error while fetching orders' });
    }
});

// DELETE /api/orders/:id - Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Server error while deleting order' });
    }
});

module.exports = router;
