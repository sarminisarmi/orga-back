const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const { authenticateToken } = require('../middleware/authenticateJWT'); // Ensure this path is correct

router.post("/cart", authenticateToken, async (req, res) => { // Use authenticateToken here
    const { productId, quantity } = req.body;

    try {
        const userId = req.user.id; // Extracted from the token
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart successfully!" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Failed to update cart" });
    }
    router.get("/cart", authenticateToken, async (req, res) => {
        try {
            const userId = req.user.id; // Extracted from the JWT token
            console.log(`Fetching cart for userId: ${userId}`); // Debugging userId

            const cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate product details
            if (!cart) {
                console.log('No cart found for this user. Returning empty cart.');
                return res.status(200).json({ items: [] }); // Return empty array if no cart exists
            }

            console.log('Cart fetched successfully:', cart.items); // Debugging fetched cart items
            res.status(200).json({ items: cart.items });
        } catch (error) {
            console.error("Error fetching cart:", error); // Debugging errors
            res.status(500).json({ message: "Failed to fetch cart" });
        }
    });
    // In your backend (e.g., Express.js)
router.delete('/cart/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      // Logic to remove item from the cart
      await Cart.findByIdAndDelete(itemId);
      res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove item' });
    }
  });
  
  router.put('/cart/:id', authenticateToken, async (req, res) => {
    const { id: productId } = req.params;
    const { quantity } = req.body;
  
    try {
      const userId = req.user.id;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const item = cart.items.find((item) => item.productId.toString() === productId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      item.quantity = quantity;
      await cart.save();
  
      res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Failed to update cart item' });
    }
  });
  


      

});

module.exports = router;
