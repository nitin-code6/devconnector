const validator = require('validator');

const validatePostData = (data) => {

   const { content } = data;

   if (!content) {
      throw new Error('Content is required');
   }

   if (
      !validator.isLength(content, {
         min: 1,
         max: 500
      })
   ) {
      throw new Error(
         'Content must be between 1 and 500 characters'
      );
   }

};

module.exports = {
   validatePostData
};