const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemsSchema = new Schema({
  menuItem: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderDetailsSchema = new Schema({
  orderUserId: {
    type: Number,
    required: true,
  },
  orderItems: {
    type: [orderItemsSchema],
  },
});

const orderSchema = new Schema(
  {
    restaurant: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
    },
    pickupTime: {
      type: String,
    },
    maxSize: {
      type: Number,
    },
    orderId: {
      type: Number,
    },
    creatorUserId: {
      type: Number,
    },
    orderStatus: {
      type: String,
    },
    orderDetails: {
      type: [orderDetailsSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
