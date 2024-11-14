const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact details
router.post('/submit', async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json({ message: 'Contact details saved successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Fetch contact details for admin
router.get('/fetch', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
