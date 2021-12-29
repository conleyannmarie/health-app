const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const apptSchema = new Schema(
   {
      apptDate: {
         type: Date,
         required: true,
      },

      apptTime: {
         type: String,
         required: true,
      },

      apptWith: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },

      confirmed: {
         type: Boolean,
      },
   },
   {
      toJSON: {
         virtuals: true,
      },
   }
);

const Appointment = model('Appointment', apptSchema);

module.exports = Appointment;
