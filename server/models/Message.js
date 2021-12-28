const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
   {
      messageBody: {
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

const Message = model('Message', messageSchema);

module.exports = Message;
