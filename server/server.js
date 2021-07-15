require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./models/user');
const CardModel = require('./models/card');
const TopicModel = require('./models/topic');
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@flowcards.1v2he.mongodb.net/flowdb?retryWrites=true&w=majority`;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure-routes');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use('/v2', passport.authenticate('jwt', { session: false }), secureRoutes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3001, () => {
  console.log('Express server started');
});

