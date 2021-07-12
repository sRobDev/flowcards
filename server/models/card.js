const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  topicId: {
    type: Number
  },
  authorId: {
    type: String
  }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;