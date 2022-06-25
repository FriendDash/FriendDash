const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// Repo Referenced: https://github.com/svmah/cs455-express-demo

let users = [
  {
    userName: 'Group1',
    userProfile: 'https://i.imgur.com/GxUEUe0.jpeg',
    userEmail: 'default1@gmail.com',
    userRating: [4, 5, 2, 3, 5],
    userOrders: ['1'],
    userId: 1,
  },
  {
    userName: '2',
    userProfile: 'https://bit.ly/dan-abramov',
    userEmail: 'default2@gmail.com',
    userRating: [2, 1, 2, 5],
    userOrders: ['2'],
    userId: 2,
  },
  {
    userName: '3',
    userProfile: 'https://bit.ly/kent-c-dodds',
    userEmail: 'default3@gmail.com',
    userRating: [5, 5, 5, 5, 4],
    userOrders: ['3'],
    userId: 3,
  },
  {
    userName: '4',
    userProfile: 'https://bit.ly/code-beast',
    userEmail: 'default4@gmail.com',
    userRating: [1, 2, 3, 4],
    userOrders: ['4'],
    userId: 4,
  },
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  return res.send(users);
});

router.get('/:userId', function (req, res, next) {
  const foundUser = users.find(user => user.userId == req.params.userId);

  if (!foundUser) return res.status(404).send({ message: 'user not found' });

  return res.send(foundUser);
});

router.post('/add', function (req, res, next) {
  if (!req.body.userEmail || !req.body.userName) {
    return res.status(400).send({ message: 'user post req missing info' });
  }
  // const user = { id: uuid(), name: req.body.name };
  const user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userRating: [],
    userOrders: [],
    userId: uuid(),
  };
  users.push(user);
  return res.send(user);
});

router.delete('/remove/:userId', function (req, res, next) {
  if (!req.params.userId) {
    return res.status(400).send({ message: 'user post req missing info' });
  }

  users = users.filter(entry => entry.userId.toString() !== req.params.userId);
  console.log(users);
  res.send('ok');
});

router.put('/update/:userId', function (req, res, next) {
  if (!req.body.userName || !req.body.userEmail || !req.body.userOrders) {
    return res.status(400).send({ message: 'user post req missing info' });
  }

  for (entry in users) {
    // console.log(req.body.userId + " | " + users[entry].userId);
    if (parseInt(users[entry].userId) === parseInt(req.params.userId)) {
      users[entry].userName = req.body.userName;
      users[entry].userEmail = req.body.userEmail;
      users[entry].userRating = req.body.userRating;
      users[entry].userOrders = req.body.userOrders;
      users[entry].userProfile = req.body.userProfile;
      users[entry].userId;
      console.log(users);
      return res.send('ok');
    }
  }
  const user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userRating: req.body.userRating,
    userOrders: req.body.userOrders,
    userId: req.body.userId,
    userProfile: req.body.userProfile,
  };
  users.push(user);
  console.log(users);
  return res.status(201).send(user);
});
module.exports = router;
