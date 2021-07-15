require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const CardModel = require('../models/card');
const TopicModel = require('../models/topic');

const router = express.Router();

// LOGIN and SIGNUP
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: "User creation successful!",
      user: req.user
    })
  }
)

// router.post(
//   '/signup',
//   async (req, res, next) => {
//     passport.authenticate(
//       'signup',
//       async (err, user) => {
//         console.log('Turbo Console Log: err, user', err, user);
//         try {
//           return res.json({
//             message: 'User creation successful',
//             user: user
//           });
//         } catch (error) {
//           return next(error);
//         }
//       }
//     )(req, res, next)
//   }
// )
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if( err || !user ) {
            return next(new Error('An error occurred on login.'));
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if(error) return next(error);

              const body = { _id: user._id, email: user.email, name: user.name };
              const token = jwt.sign( { user: body }, process.env.JWT_SECRET);

              return res.json({ token });
            }
          )
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next)
  }
)

// CARD ROUTES
router.get(
  '/v2/cards/all',
  async (req, res, next) => {
    try {
      const cards = await CardModel.find();

      if(!cards) {
        return res.status(500).send('Unable to find cards');
      }

      res.send(cards);
    } catch (error) {
      next(error);
    }

  }
)

module.exports = router;