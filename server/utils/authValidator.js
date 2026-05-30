const validator = require('validator');

const validateRegisterData = (data) => {
console.log(data);
   const mandatoryFields = [
      'name',
      'email',
      'password'
   ];

   const isAllowed = mandatoryFields.every(
      field => Object.keys(data).includes(field)
   );

   if (!isAllowed) {
      throw new Error('Required fields missing');
   }

   if (!validator.isLength(data.name, {
      min: 3,
      max: 30
   })) {
      throw new Error(
         'Name must be between 3 and 30 characters'
      );
   }

   if (!validator.isEmail(data.email)) {
      throw new Error('Invalid Email');
   }

   if (!validator.isStrongPassword(
      data.password,
      {
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1
      }
   )) {
      throw new Error(
         'Password must contain uppercase, lowercase, number and special character'
      );
   }
};

module.exports = {
   validateRegisterData
};