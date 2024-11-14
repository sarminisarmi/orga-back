const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Route to save payment details to the database
router.post("/payments", async (req, res) => {
  const { orderId, payerId, amount, currency, status } = req.body;

  try {
    const payment = new Payment({
      orderId,
      payerId,
      amount,
      currency,
      status,
    });

    await payment.save();
    res.status(201).json({ message: "Payment saved successfully", payment });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ message: "Error saving payment", error });
  }
});

// Route to fetch all payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error fetching payments", error });
  }
});

module.exports = router;
