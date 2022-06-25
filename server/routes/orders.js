const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// Repo Referenced: https://github.com/svmah/cs455-express-demo

let orders = [
  {
    restaurant: 'Subway',
    creatorFirstName: 'Johhny',
    creatorLastName: 'Hacks',
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
    creatorFirstName: 'Hacker',
    creatorLastName: 'Rank',
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
    creatorFirstName: 'Coder',
    creatorLastName: 'Ility',
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
    creatorFirstName: 'Codey',
    creatorLastName: 'Monkey',
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

/* GET orders listing. */
router.get('/', function (req, res, next) {
  return res.send(orders);
});

router.get('/:orderId', function (req, res, next) {
  const foundOrder = orders.find(order => order.orderId == req.params.orderId);

  if (!foundOrder) return res.status(404).send({ message: 'order not found' });

  return res.send(foundOrder);
});

router.post('/add', function (req, res, next) {
  if (
    !req.body.restaurant ||
    !req.body.creatorFirstName ||
    !req.body.creatorLastName ||
    !req.body.creatorUserId
  ) {
    return res.status(400).send({ message: 'order post req missing info' });
  }
  // const order = { id: uuid(), name: req.body.name };
  const order = {
    restaurant: req.body.restaurant,
    creatorFirstName: req.body.creatorFirstName,
    creatorLastName: req.body.creatorLastName,
    pickupLocation: req.body.pickupLocation,
    pickupTime: req.body.pickupTime,
    orderId: req.body.orderId,
    creatorUserId: req.body.creatorUserId,
    maxSize: req.body.maxSize,
    orderStatus: 'new',
    orderDetails: [],
  };
  orders.push(order);
  return res.send(order);
});

router.delete('/remove/:orderId', function (req, res, next) {
  if (!req.params.orderId) {
    return res.status(400).send({ message: 'order post req missing info' });
  }

  orders = orders.filter(
    entry => entry.orderId.toString() !== req.params.orderId
  );
  console.log(orders);
  res.send('ok');
});

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

  for (entry in orders) {
    console.log(req.body.orderId + ' | ' + orders[entry].orderId);
    if (parseInt(orders[entry].orderId) === parseInt(req.params.orderId)) {
      orders[entry].orderDetails = req.body.orderDetails;
    }
  }
  console.log(orders);
  return res.send(orders);
});
module.exports = router;
