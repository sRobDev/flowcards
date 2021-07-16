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
);

router.get(
  '/logout',
  async (req, res) => {
    req.logout();
    return res.json();
  }
)

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

              return res.json({ token, body });
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