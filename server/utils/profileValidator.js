const validator = require('validator');

const validateProfileData = (data) => {

   const { username, skills, bio } = data;

   if (!username) {
      throw new Error(
         'Username is required'
      );
   }

   if (
      !validator.isLength(username, {
         min: 3,
         max: 30
      })
   ) {
      throw new Error(
         'Username must be between 3 and 30 characters'
      );
   }

   if (!skills) {
      throw new Error(
         'Skills are required'
      );
   }

   if (!Array.isArray(skills)) {
      throw new Error(
         'Skills must be an array'
      );
   }

   if (skills.length === 0) {
      throw new Error(
         'At least one skill is required'
      );
   }

   if (
      bio &&
      !validator.isLength(bio, {
         max: 500
      })
   ) {
      throw new Error(
         'Bio cannot exceed 500 characters'
      );
   }

};

module.exports = {
   validateProfileData
};