const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   username: {
      type: String,
      required: true,
      unique: true
   },

   bio: {
      type: String
   },

   skills: [{
      type: String
   }],

   company: {
      type: String
   },

   location: {
      type: String
   },

   socials: {

      github: {
         type: String
      },

      linkedin: {
         type: String
      },

      x: {
         type: String
      },

      portfolio: {
         type: String
      }

   }

}, {
   timestamps: true
});

module.exports = mongoose.model(
   'Profile',
   profileSchema
);