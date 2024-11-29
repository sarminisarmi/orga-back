// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const cartItemSchema = new Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product', // Refers to the Product model
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1, // Default to 1 if not provided
//   },
// });

// const cartSchema = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Refers to the User model
//       required: true,
//     },
//     items: [cartItemSchema], // Array of cart items
//   },
//   {
//     timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
//   }
// );

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;



const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
