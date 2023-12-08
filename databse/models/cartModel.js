import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  subtotal: {
    type: Number,
    required: true
  }
});
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the cart (you may need to define a User model)
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
