const express = require('express');
const router = express.Router();

const UserModel = require('../models/user');
const CardModel = require('../models/card');
const TopicModel = require('../models/topic');

/* Routes from previous server (putting them here for reference)

  .post('/v2/user/new', createUser)
  .get('/v2/user/:id', getUser)
  .get('/v2/user/cards/:authorId', getUserCards)

  .post('/v2/card/new', createCard)
  .get('/v2/cards/all', getAllCards)
  .post('/v2/card/delete/:id', deleteCard)
  .put('/v2/card/update/:id', updateCard)
  .get('/v2/card/:id', getCard)
  
  .post('/v2/topic/new/:authorId', createTopic)
  .get('/v2/topics/all/:authorId', getAllTopics)
  .get('/v2/topic/update/:id', updateTopic)
  .delete('/v2/topic/delete/:id', deleteTopic)
  .get('/v2/topic/:id', getTopic);
*/

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

router.get(
  '/user/:id/cards',
  async (req, res) => {
    try {
      const cards = await CardModel.find({ authorId: req.params.id });

      if(!cards) {
        return res.status(500).send('Unable to find cards');
      }

      return res.json(cards);
    } catch (error) {
      res.status(500).send('Unable to find cards for user: ', req.params.id);
    }
  }
)

router.post(
  '/cards/new/:authorId',
  async (req, res) => {
    try {
      const card = new CardModel({...req.body, authorId: req.params.authorId});

      const savedCard = await card.save();

      return res.json(savedCard);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.delete(
  '/cards/delete/:id',
  async (req, res) => {
    try {
      const deleted = await CardModel.deleteOne({ _id: req.params.id });
      if(!deleted.ok) return res.status(500).send({ message: 'Problem deleting card'});

      return res.json(deleted);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.get(
  '/cards/:id',
  async (req, res) => {
    try {
      const card = await CardModel.findOne({ _id: req.params.id});

      return res.json(card);
    } catch (error) {
      
    }
  }
)

router.put(
  '/cards/update/:id/',
  async (req, res) => {
    try {
      const card = await CardModel.updateOne({ _id: req.params.id }, req.body);

      if(!card.ok) res.status(500).send({ message: 'Problem updating card' });

      return res.json(card);
    } catch(error) {
      return res.status(500).send(error);
    }
  }
)
module.exports = router;