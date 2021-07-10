require('dotenv').config();
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('@koa/router')();
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const Card = require('./models/card');
const Topic = require('./models/topic');
const User = require('./models/user');

const app = module.exports = new Koa();
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@flowcards.1v2he.mongodb.net/flowdb?retryWrites=true&w=majority`;

app.use(koaBody());
app.use(cors());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('[db] Connected to db, starting app...');
    app.listen(3001);
  })
  .catch((err) => console.error(err));

router.get('/', hello)
  .post('/v2/user/new', createUser)
  .get('/v2/user/:id', getUser)

  .post('/v2/card/new', createCard)
  .get('/v2/cards/all', getAllCards)
  .post('/v2/card/delete/:id', deleteCard)
  .put('/v2/card/:id/update', updateCard)
  .get('/v2/card/:id', getCard)
  
  .post('/v2/topic/new/:authorId', createTopic)
  .get('/v2/topics/all/:authorId', getAllTopics)
  .get('/v2/topic/update/:id', updateTopic)
  .delete('/v2/topic/delete/:id', deleteTopic)
  .get('/v2/topic/:id', getTopic);

app.use(router.routes());

async function createCard(ctx) {
  const card = new Card(ctx.request.body);

  ctx.body = await card.save();
}

async function hello(ctx) {
  ctx.body = 'Flowcards API is healthy and responding!';
}

async function getUser(ctx) {
  ctx.body = await User.findOne({ _id: ctx.params.id });
}

async function createUser(ctx) {
  const user = new User(ctx.request.body);
  ctx.body = await user.save();
}

async function getAllCards(ctx) {
  ctx.body = await Card.find();
}

async function getCard(ctx) {
  ctx.body = await Card.findOne({ _id: ctx.params.id });
}

async function deleteCard(ctx) {
  ctx.body = await Card.deleteOne({ _id: ctx.params.id });
}

async function updateCard(ctx) {
  ctx.body = Card.updateOne({ _id: ctx.params.id }, ctx.request.body);
}

async function getTopic(ctx) {
  ctx.body = await Card.findOne({ _id: ctx.params.id });
}

async function getAllTopics(ctx) {
  ctx.body = await Topic.find({ authorId: ctx.params.authorId });
}

async function createTopic(ctx) {
  const topic = new Topic({
    ...ctx.request.body,
    authorId: ctx.params.authorId
  });

  ctx.body = await topic.save();
}

async function updateTopic(ctx) {
  ctx.body = Topic.updateOne({ _id: ctx.params.id }, ctx.request.body);
}

async function deleteTopic(ctx) {
  ctx.body = await Topic.deleteOne({ _id: ctx.params.id });
}
