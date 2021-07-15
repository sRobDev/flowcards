const express = require('express');
const router = express.Router();

router.get(
  '/jwthealth',
  async (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user
    });
  }
);

router.get(
  '/user/:id',
  async (req, res, next) => {
    res.json({
      user: req.user
    })
  }
);

module.exports = router;