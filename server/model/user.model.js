const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userRating: {
      type: [Number],
    },
    userOrders: {
      type: [String],
    },
    googleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
