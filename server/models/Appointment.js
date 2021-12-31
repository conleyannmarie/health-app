const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const apptSchema = new Schema(
   {
      apptDate: {
         type: Date,
         required: true,
      },

      apptTime: {
         type: Date,
         required: true,
      },

      apptWith: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },

      confirmed: {
         type: Boolean,
         required: true,
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
