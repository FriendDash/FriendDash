const express = require('express');
const router = express.Router();

let User = require('../model/user.model');

// Repo Referenced: https://github.com/svmah/cs455-express-demo
const stripe = require('stripe')(process.env.STRIPE_SK);

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
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET A SINGLE ORDER BY MONGODB ID (_ID)
router.get('/mongo/:userId', function (req, res, next) {
  User.findById(req.params.userId) // find it by id
    .then(user => res.send(user)) //then return as json ; else return error
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET A SINGLE ORDER BY googleid
router.get('/:googleId', function (req, res, next) {
  User.findOne({ googleId: req.params.googleId })
    .then(user => res.send(user)) //then return as json ; else return error
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', function (req, res, next) {
  console.log('Add route');
  if (!req.body.userEmail || !req.body.userName || !req.body.googleId) {
    return res.status(400).send({ message: 'user post req missing info' });
  }

  User.findOne({ googleId: req.body.googleId })
    .select('_id')
    .lean()
    .then(async result => {
      console.log('finding match');
      if (result) {
        // user exists...

        User.findOne({ googleId: req.body.googleId }) // find it by id
          .then(user => res.send(user)) //then return as json ; else return error
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        // user does not exist
        const customer = await stripe.customers.create({
          email: req.body.userEmail,
          name: req.body.userName
        });
        const user = new User({
          userName: req.body.userName,
          userProfile: req.body.userProfile,
          userEmail: req.body.userEmail,
          userRating: [],
          userOrders: [],
          googleId: req.body.googleId,
          stripeId: customer.id
        });
        
        user.save()
          .then(user => res.send(user)) //then return as json ; else return error
          .catch(err => res.status(400).json('Error: ' + err));
      }
    });
});

router.delete('/remove/:userId', function (req, res, next) {
  if (!req.params.userId) {
    return res.status(400).send({ message: 'user post req missing info' });
  }

  User.findByIdAndDelete(req.params.userId)
    .then(deletedUser => res.json(deletedUser))
    .catch(err => res.status(404).json('Error: ' + err));
});

// uses mongodb _id
router.put('/update/:userId/', function (req, res, next) {
  if (!req.body.userName || !req.body.userEmail || !req.body.userOrders) {
    return res.status(400).send({ message: 'user post req missing info' });
  }

  const user = {
    userName: req.body.userName,
    userProfile: req.body.userProfile,
    userEmail: req.body.userEmail,
    userRating: req.body.userRating,
    userOrders: req.body.userOrders,
    googleId: req.body.googleId,
  };

  User.findByIdAndUpdate(req.params.userId, user, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
