const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    variants: { type: Array, required: true },
    ingredients: { type: Array, required: true },
    nutritionLabel: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
