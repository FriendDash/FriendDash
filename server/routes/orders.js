const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

let Order = require('../model/order.model');

// Repo Referenced: https://github.com/svmah/cs455-express-demo
// Repo Referenced: https://github.com/MrBenC88/CPSC455-Assign2_3_4-RecipeSite/blob/main/server/routes/recipes.js

let orders = [
  {
    restaurant: 'Subway',
    creatorName: 'Johhny Hacks',
    pickupLocation: '5751 Student Union Blvd',
    pickupTime: '6:30pm',
    maxSize: 4,
    orderId: 1,
    creatorUserId: 1,
    orderStatus: 'open',
    orderDetails: [
      {
        orderUserId: 1,
        orderItems: [
          { menuItem: 'Classic Foot Long', price: 8, quantity: 2 },
          { menuItem: 'Doritos', price: 2, quantity: 1 },
          { menuItem: 'Sprite', price: 3, quantity: 1 },
        ],
      },
    ],
  },
  {
    restaurant: 'Pizza Pizza',
    creatorName: 'Hacker Rank',
    pickupLocation: '5751 Student Union Blvd',
    pickupTime: '7:00pm',
    maxSize: 4,
    orderId: 2,
    creatorUserId: 2,
    orderStatus: 'open',
    orderDetails: [
      {
        orderUserId: 2,
        orderItems: [{ menuItem: 'Cheese Pizza', price: 16, quantity: 1 }],
      },
    ],
  },

  {
    restaurant: 'Nori Bento & Udon',
    creatorName: 'Coder Ility',
    pickupLocation: '5751 Student Union Blvd',
    pickupTime: '7:10pm',
    maxSize: 4,
    orderId: 3,
    creatorUserId: 3,
    orderStatus: 'open',
    orderDetails: [
      {
        orderUserId: 3,
        orderItems: [
          { menuItem: 'Beef Bento', price: 11, quantity: 1 },
          { menuItem: 'Chicken Karage', price: 3, quantity: 1 },
          { menuItem: 'Bubbly', price: 1, quantity: 1 },
        ],
      },
    ],
  },
  {
    restaurant: 'McDonalds',
    creatorName: 'Codey Monkey',
    pickupLocation: '5751 Student Union Blvd',
    pickupTime: '7:20pm',
    maxSize: 4,
    orderId: 4,
    creatorUserId: 4,
    orderStatus: 'open',
    orderDetails: [
      {
        orderUserId: 4,
        orderItems: [
          { menuItem: 'Big Mac', price: 7, quantity: 1 },
          { menuItem: 'Fries (Large)', price: 4, quantity: 1 },
          { menuItem: 'Coca Cola', price: 2, quantity: 1 },
        ],
      },
      {
        orderUserId: 4,
        orderItems: [
          { menuItem: 'McDouble', price: 3, quantity: 2 },
          { menuItem: 'Chicken Nuggets (10)', price: 7, quantity: 1 },
          { menuItem: 'Sprite', price: 2, quantity: 1 },
        ],
      },
      {
        orderUserId: 4,
        orderItems: [
          { menuItem: 'Quarter Pounder', price: 7, quantity: 2 },
          { menuItem: 'McChicken', price: 7, quantity: 3 },
          { menuItem: 'Coffee (Medium)', price: 2, quantity: 1 },
          { menuItem: 'Coca Cola', price: 2, quantity: 4 },
          { menuItem: 'Fries (Large)', price: 4, quantity: 1 },
          { menuItem: 'Apple Slices', price: 2, quantity: 1 },
        ],
      },
      {
        orderUserId: 4,
        orderItems: [{ menuItem: 'Cheeseburger', price: 3, quantity: 1 }],
      },
    ],
  },
];

/* GET ALL orders listing. */
router.get('/', function (req, res, next) {
  Order.find()
    .then(orders => res.json(orders)) //
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET A SINGLE ORDER BY MONGODB ID (_ID)
router.get('/:orderId', function (req, res, next) {
  Order.findById(req.params.orderId) // find it by id
    .then(order => res.send(order)) //then return as json ; else return error
    .catch(err => res.status(400).json('Error: ' + err));
});

//  POST ONE recipe
router.post('/add', function (req, res, next) {
  if (
    !req.body.restaurant ||
    !req.body.creatorName ||
    !req.body.creatorUserId
  ) {
    return res.status(400).send({ message: 'order post req missing info' });
  }

  const restaurant = req.body.restaurant;
  const creatorName = req.body.creatorName;
  const pickupLocation = req.body.pickupLocation;
  const pickupTime = req.body.pickupTime;
  const maxSize = req.body.maxSize;
  const orderId = req.body.orderId;
  const creatorUserId = req.body.creatorUserId;
  const orderStatus = 'open';
  const orderDetails = [];

  const newOrder = new Order({
    restaurant,
    creatorName,
    pickupLocation,
    pickupTime,
    maxSize,
    orderId,
    creatorUserId,
    orderStatus,
    orderDetails,
  });

  newOrder
    .save() // save the new order  to the database
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error: ' + err));
});

//  DELETE ONE recipe by MONGODB ID (_ID)
router.delete('/remove/:orderId', function (req, res, next) {
  if (!req.params.orderId) {
    return res.status(400).send({ message: 'order post req missing info' });
  }

  Order.findByIdAndDelete(req.params.orderId)
    .then(() => res.json(`Order with id ${req.params.orderId} deleted!`))
    .catch(err => res.status(404).json('Error: ' + err));
});

// UPDATE ONE recipe by ID
// THE ID IN THIS CASE IS USING THE MONGODB ID RETURNED _id
router.put('/update/:orderId', function (req, res, next) {
  if (
    !req.body
    // !req.body.restaurant ||
    // !req.body.creatorFirstName ||
    // !req.body.creatorLastName ||
    // !req.body.creatorUserId
  ) {
    return res.status(400).send({ message: 'order post req missing info' });
  }

  const body = req.body;
  const order = {
    restaurant: req.body.restaurant,
    creatorName: req.body.creatorName,
    pickupLocation: req.body.pickupLocation,
    pickupTime: req.body.pickupTime,
    maxSize: req.body.maxSize,
    orderId: req.body.orderId,
    creatorUserId: req.body.creatorUserId,
    orderStatus: req.body.orderStatus,
    orderDetails: req.body.orderDetails,
  };

  Order.findByIdAndUpdate(req.params.orderId, order, { new: true })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
