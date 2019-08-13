//  helpers/validators.js

const joi = require('@hapi/joi');

module.exports = {
  userDataSchema: {
    // Email must be a string of length between 7 and 50
    email: joi
      .string()
      .email()
      .min(7)
      .max(50)
      .required(),

    // Password must be between 7 and 15 characters with at least one special character and numerical digit
    password: joi
      .string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*](7,15)$/)
      .required()
  },
  productDataSchema: {
    // Must be a url from the amazon domain
    url: joi
      .string()
      .regex(/^https:\/\/www\.amazon\.ca\/.+\/\w{10}\?.+$/)
      .required()
  }
};
