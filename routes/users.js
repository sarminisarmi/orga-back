

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user role
// router.put('/:id/role', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { role } = req.body; // Expecting { role: 'newRole' }

//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the role
//         user.role = role; // Assuming you want to update the role directly
//         await user.save();

//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// router.put('/update-role/:id', async (req, res) => {
//   try {
//     const { role } = req.body; // Make sure role is being passed from the frontend
//     if (!['user', 'customer', 'admin'].includes(role)) {
//       return res.status(400).json({ message: 'Invalid role' });
//     }
    
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'Role updated successfully', user });
//   } catch (error) {
//     console.error('Error updating user role:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
  
router.put('/update-role/:id', async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'customer', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
