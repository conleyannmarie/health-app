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
         type: String,
         required: true,
      },

      username: {
         type: String,
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
