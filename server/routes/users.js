const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Repo Referenced: https://github.com/svmah/cs455-express-demo

let users = [
  {
    userName: "Group1",
    userEmail:
      "1/4 cup mayonnaise, 5 slices bread, toasted, 4 slices process American cheese, 12 bacon strips, cooked and crumbled, 2 tablespoons butter, 2 tablespoons all-purpose flour, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1 cup 2% milk, 4 large eggs, 1 medium tomato, halved and sliced, 1/2 cup shredded cheddar cheese, 2 green onions, thinly sliced, Shredded lettuce",
    userRating:
      "Preheat oven to 325°. Spread mayonnaise on 1 side of each slice of toast and cut into small pieces. Arrange toast, mayonnaise side up, in a greased 8-in. square baking dish. Top with cheese slices and bacon. In a small saucepan, melt butter. Stir in flour, salt and pepper until smooth. Gradually add milk. Bring to a boil; cook and stir until thickened, 2 minutes. Pour over bacon.  In a large skillet, fry eggs over medium heat until they reach desired doneness; place over bacon. Top with tomato slices; sprinkle with cheddar cheese and onions. Bake, uncovered, 10 minutes. Cut in squares; serve with lettuce.",
    userOrders: "https://i.imgur.com/UBhDvzR.jpg",
    userId: 1,
  },
  {
    userName: "2",
    userEmail:
      "1/4 cup mayonnaise, 5 slices bread, toasted, 4 slices process American cheese, 12 bacon strips, cooked and crumbled, 2 tablespoons butter, 2 tablespoons all-purpose flour, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1 cup 2% milk, 4 large eggs, 1 medium tomato, halved and sliced, 1/2 cup shredded cheddar cheese, 2 green onions, thinly sliced, Shredded lettuce",
    userRating:
      "Preheat oven to 325°. Spread mayonnaise on 1 side of each slice of toast and cut into small pieces. Arrange toast, mayonnaise side up, in a greased 8-in. square baking dish. Top with cheese slices and bacon. In a small saucepan, melt butter. Stir in flour, salt and pepper until smooth. Gradually add milk. Bring to a boil; cook and stir until thickened, 2 minutes. Pour over bacon.  In a large skillet, fry eggs over medium heat until they reach desired doneness; place over bacon. Top with tomato slices; sprinkle with cheddar cheese and onions. Bake, uncovered, 10 minutes. Cut in squares; serve with lettuce.",
    userOrders: "https://i.imgur.com/UBhDvzR.jpg",
    userId: 2,
  },
  {
    userName: "3",
    userEmail:
      "1/4 cup mayonnaise, 5 slices bread, toasted, 4 slices process American cheese, 12 bacon strips, cooked and crumbled, 2 tablespoons butter, 2 tablespoons all-purpose flour, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1 cup 2% milk, 4 large eggs, 1 medium tomato, halved and sliced, 1/2 cup shredded cheddar cheese, 2 green onions, thinly sliced, Shredded lettuce",
    userRating:
      "Preheat oven to 325°. Spread mayonnaise on 1 side of each slice of toast and cut into small pieces. Arrange toast, mayonnaise side up, in a greased 8-in. square baking dish. Top with cheese slices and bacon. In a small saucepan, melt butter. Stir in flour, salt and pepper until smooth. Gradually add milk. Bring to a boil; cook and stir until thickened, 2 minutes. Pour over bacon.  In a large skillet, fry eggs over medium heat until they reach desired doneness; place over bacon. Top with tomato slices; sprinkle with cheddar cheese and onions. Bake, uncovered, 10 minutes. Cut in squares; serve with lettuce.",
    userOrders: "https://i.imgur.com/UBhDvzR.jpg",
    userId: 3,
  },
  {
    userName: "5",
    userEmail:
      "1/4 cup mayonnaise, 5 slices bread, toasted, 4 slices process American cheese, 12 bacon strips, cooked and crumbled, 2 tablespoons butter, 2 tablespoons all-purpose flour, 1/4 teaspoon salt, 1/8 teaspoon pepper, 1 cup 2% milk, 4 large eggs, 1 medium tomato, halved and sliced, 1/2 cup shredded cheddar cheese, 2 green onions, thinly sliced, Shredded lettuce",
    userRating:
      "Preheat oven to 325°. Spread mayonnaise on 1 side of each slice of toast and cut into small pieces. Arrange toast, mayonnaise side up, in a greased 8-in. square baking dish. Top with cheese slices and bacon. In a small saucepan, melt butter. Stir in flour, salt and pepper until smooth. Gradually add milk. Bring to a boil; cook and stir until thickened, 2 minutes. Pour over bacon.  In a large skillet, fry eggs over medium heat until they reach desired doneness; place over bacon. Top with tomato slices; sprinkle with cheddar cheese and onions. Bake, uncovered, 10 minutes. Cut in squares; serve with lettuce.",
    userOrders: "https://i.imgur.com/UBhDvzR.jpg",
    userId: 5,
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.send(users);
});

router.get("/:userId", function (req, res, next) {
  const foundUser = users.find((user) => user.userId === req.params.userId);

  if (!foundUser) return res.status(404).send({ message: "user not found" });

  return res.send(foundUser);
});

router.post("/add", function (req, res, next) {
  if (!req.body.userEmail || !req.body.userName) {
    return res.status(400).send({ message: "user post req missing info" });
  }
  // const user = { id: uuid(), name: req.body.name };
  const user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userRating: req.body.userRating,
    userOrders: req.body.userOrders,
    userId: uuid(),
  };
  users.push(user);
  return res.send(user);
});

router.delete("/remove/:userId", function (req, res, next) {
  if (!req.params.userId) {
    return res.status(400).send({ message: "user post req missing info" });
  }

  users = users.filter(
    (entry) => entry.userId.toString() !== req.params.userId
  );
  console.log(users);
  res.send("ok");
});

router.put("/update/:userId", function (req, res, next) {
  if (!req.body.userName || !req.body.userEmail || !req.body.userOrders) {
    return res.status(400).send({ message: "user post req missing info" });
  }

  for (entry in users) {
    // console.log(req.body.userId + " | " + users[entry].userId);
    if (parseInt(users[entry].userId) === parseInt(req.params.userId)) {
      users[entry].userName = req.body.userName;
      users[entry].userEmail = req.body.userEmail;
      users[entry].userOrders = req.body.userOrders;
      users[entry].userOrders = req.body.userOrders;
      users[entry].userId;
    }
  }
  console.log(users);
  return res.send("ok");
});
module.exports = router;
