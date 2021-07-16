require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@flowcards.1v2he.mongodb.net/flowdb?retryWrites=true&w=majority`;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure-routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use('/v2', passport.authenticate('jwt', { session: false }), secureRoutes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Express server started at', port);
});

