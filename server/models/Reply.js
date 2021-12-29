<<<<<<< HEAD
const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
=======
const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
>>>>>>> 9d7dd1b7301dd983e844ebed1a517a0c8a825aa6

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: false,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reply = model('Reply', replySchema)
module.exports = Reply;
