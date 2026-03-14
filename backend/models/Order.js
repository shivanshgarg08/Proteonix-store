const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    products: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    userId: { type: String, default: null },
    orderTime: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
