const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
   {
      messageBody: {
         type: String,
         required: false,
         maxlength: 280,
      },
      createdAt: {
         type: Date,
         default: Date.now,
         get: (timestamp) => dateFormat(timestamp),
      },
      username: {
         type: String,
         required: true,
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
