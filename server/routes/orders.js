const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Repo Referenced: https://github.com/svmah/cs455-express-demo

let orders = [
  {
    restaurant: "Subway",
    creatorFirstName: "Johhny",
    creatorLastName: "Hacks",
    pickupLocation: "5751 Student Union Blvd",
    pickupTime: "6:30pm",
    orderId: 1,
    creatorUserId: 1,
  },
  {
    restaurant: "Pizza Pizza",
    creatorFirstName: "Hacker",
    creatorLastName: "Rank",
    pickupLocation: "5751 Student Union Blvd",
    pickupTime: "7:00pm",
    orderId: 2,
    creatorUserId: 2,
  },

  {
    restaurant: "Nori Bento & Udon",
    creatorFirstName: "Coder",
    creatorLastName: "Ility",
    pickupLocation: "5751 Student Union Blvd",
    pickupTime: "7:10pm",
    orderId: 3,
    creatorUserId: 3,
  },
  {
    restaurant: "McDonalds",
    creatorFirstName: "Codey",
    creatorLastName: "Monkey",
    pickupLocation: "5751 Student Union Blvd",
    pickupTime: "7:20pm",
    orderId: 4,
    creatorUserId: 4,
  },
];

/* GET orders listing. */
router.get("/", function (req, res, next) {
  return res.send(orders);
});

router.get("/:orderId", function (req, res, next) {
  const foundOrder = orders.find(
    (order) => order.orderId === req.params.orderId
  );

  if (!foundOrder) return res.status(404).send({ message: "order not found" });

  return res.send(foundOrder);
});

router.post("/add", function (req, res, next) {
  if (
    !req.body.restaurant ||
    !req.body.creatorFirstName ||
    !req.body.creatorLastName ||
    !req.body.creatorUserId
  ) {
    return res.status(400).send({ message: "order post req missing info" });
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
  };
  orders.push(order);
  return res.send(order);
});

router.delete("/remove/:orderId", function (req, res, next) {
  if (!req.params.orderId) {
    return res.status(400).send({ message: "order post req missing info" });
  }

  orders = orders.filter(
    (entry) => entry.orderId.toString() !== req.params.orderId
  );
  console.log(orders);
  res.send("ok");
});

router.put("/update/:orderId", function (req, res, next) {
  if (
    !req.body.restaurant ||
    !req.body.creatorFirstName ||
    !req.body.creatorLastName ||
    !req.body.creatorUserId
  ) {
    return res.status(400).send({ message: "order post req missing info" });
  }

  for (entry in orders) {
    // console.log(req.body.orderId + " | " + orders[entry].orderId);
    if (parseInt(orders[entry].orderId) === parseInt(req.params.orderId)) {
      orders[entry].restaurant = req.body.restaurant;
      orders[entry].creatorFirstName = req.body.creatorFirstName;
      orders[entry].creatorLastName = req.body.creatorLastName;
      orders[entry].pickupLocation = req.body.pickupLocation;
      orders[entry].pickupTime = req.body.pickupTime;
      orders[entry].orderId;
      orders[entry].creatorUserId = req.body.creatorUserId;
    }
  }
  console.log(orders);
  return res.send("ok");
});
module.exports = router;