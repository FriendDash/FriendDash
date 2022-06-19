const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Repo Referenced: https://github.com/svmah/cs455-express-demo

let orders = [
  {
    title: "Group1",
    orderDetails:
      "1/4 cup mayonnaise, 5 slices bread, toasted, 4 slices process American cheese, 12 bacon strips, cooked and crumbled, 2 tablespoons butter, 2 tablespoons all-purpose flour, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1 cup 2% milk, 4 large eggs, 1 medium tomato, halved and sliced, 1/2 cup shredded cheddar cheese, 2 green onions, thinly sliced, Shredded lettuce",
    orderList:
      "Preheat oven to 325°. Spread mayonnaise on 1 side of each slice of toast and cut into small pieces. Arrange toast, mayonnaise side up, in a greased 8-in. square baking dish. Top with cheese slices and bacon. In a small saucepan, melt butter. Stir in flour, salt and pepper until smooth. Gradually add milk. Bring to a boil; cook and stir until thickened, 2 minutes. Pour over bacon.  In a large skillet, fry eggs over medium heat until they reach desired doneness; place over bacon. Top with tomato slices; sprinkle with cheddar cheese and onions. Bake, uncovered, 10 minutes. Cut in squares; serve with lettuce.",
    imgUrl: "https://i.imgur.com/UBhDvzR.jpg",
    orderId: 1,
  },
  {
    title: "Group2",
    orderDetails:
      "tablespoons olive oil, 2 medium red potatoes (about 1/2 lb.), cut into 1/4-inch cubes, 1 medium onion, chopped, 2 small zucchini, shredded (about 3 cups), 4 frozen fully cooked breakfast sausage links, thawed and cut into 1/2-inch slices, 1/2 cup chopped roasted sweet red peppers, 6 cherry tomatoes, quartered, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1/2 cup shredded cheddar cheese, 4 large eggs",
    orderList:
      "In a large skillet, heat oil over medium-high heat. Add potatoes and onion; cook and stir 4-6 minutes or until potatoes are crisp-tender. Stir in zucchini and sausage; cook 4-6 minutes longer or until the vegetables are tender.Gently stir in red peppers, tomatoes, salt and pepper; sprinkle with cheese. With back of spoon, make four wells in potato mixture; break an egg into each well. Reduce heat to medium. Cook, covered, 4-6 minutes or until egg whites are completely set and yolks begin to thicken but are not hard.",
    imgUrl: "https://i.imgur.com/TFInbcO.jpg",
    orderId: 2,
  },

  {
    title: "McDonalds Fast Food Run",
    orderDetails:
      "12 large eggs, 1 cup 2% milk, 1 teaspoon salt, 1/2 teaspoon pepper, 1 package (30 ounces) frozen shredded hash brown potatoes, thawed, 2 cups cubed fully cooked ham (about 1 pound), 1 medium onion, chopped, 4 cups shredded cheddar cheese",
    orderList:
      "Whisk together first 4 orderDetails. Place a third of the potatoes in a greased 5- or 6-qt. slow cooker; layer with a third of each of the following: ham, onion and cheese. Repeat layers twice. Pour egg mixture over top. Refrigerate, covered, overnight. Cook, covered, on low 4-5 hours, until casserole is set and edges begin to brown. Turn off slow cooker. Remove insert; let stand, uncovered, 30 minutes before serving.",
    imgUrl: "https://i.imgur.com/xymsrBH.jpg",
    orderId: 3,
  },
  {
    title: "Pizza Hut Run",
    orderDetails:
      "5 cups frozen shredded hash brown potatoes (about 15 ounces), 1 cup refried beans, 1/4 cup salsa, 2 naan flatbreads, halved,  4 large eggs, 1/2 cup shredded cheddar cheese or Mexican cheese blend, Additional salsa, optional",
    orderList:
      "Cook potatoes according to package directions for stovetop. Meanwhile, in a microwave-safe bowl, mix beans and salsa. Microwave, covered, on high until heated through, 1-2 minutes, stirring once. In a large skillet, heat naan over medium-high heat until lightly browned, 2-3 minutes per side; remove from pan. Keep warm. Coat same skillet with cooking spray; place over medium-high heat. Break eggs, 1 at a time, into pan; reduce heat to low. Cook until whites are set and yolks begin to thicken, turning once if desired. To serve, spread bean mixture over naan. Top with potatoes, eggs and cheese. If desired, serve with additional salsa.",
    imgUrl: "https://i.imgur.com/3rWBNvc.jpg",
    orderId: 4,
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
  if (!req.body.title || !req.body.orderDetails || !req.body.orderList) {
    return res.status(400).send({ message: "order post req missing info" });
  }
  // const order = { id: uuid(), name: req.body.name };
  const order = {
    title: req.body.title,
    orderDetails: req.body.orderDetails,
    orderList: req.body.orderList,
    imgUrl: req.body.imgUrl,
    orderId: uuid(),
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
  if (!req.body.title || !req.body.orderDetails || !req.body.orderList) {
    return res.status(400).send({ message: "order post req missing info" });
  }

  for (entry in orders) {
    // console.log(req.body.orderId + " | " + orders[entry].orderId);
    if (orders[entry].orderId === req.body.orderId) {
      orders[entry].title = req.body.title;
      orders[entry].orderDetails = req.body.orderDetails;
      orders[entry].orderList = req.body.orderList;
      orders[entry].imgUrl = req.body.imgUrl;
      orders[entry].orderId;
    }
  }
  console.log(orders);
  return res.send("ok");
});
module.exports = router;
