const { Schema, model } = require('mongoose');
const replySchema = require('./Reply')
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
   {
      messageText: {
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
      replies: [replySchema]
   },
   {
      toJSON: {
         getters: true,
      },
   }
);

messageSchema.virtual('replyCount').get(function() {
   return this.replies.length;
 });
 
 const Message = model('Message', messageSchema);
 
 module.exports = Message;
