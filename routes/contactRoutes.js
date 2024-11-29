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
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  // Ensure the ID format is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Attempt to delete the contact from the database
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
