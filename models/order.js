
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the order schema
// const orderSchema = new Schema({
//   customerName: { type: String, required: true },
//   address: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   cart: [
//     {
//       product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   status: { type: String, default: 'Pending' },
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);





// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//   customerName: { type: String, required: true },
//   address: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
  
//   totalPrice: { type: Number, required: true },
//   status: { type: String, default: 'Pending' },
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;



const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Assuming you have a Product model
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

