const Joi = require('joi');
const mongoose = require('mongoose');


const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
 
});

const signup = mongoose.model('signup', signupSchema);

function validatesignup(signup) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
    .min(8) // Minimum length of 8 characters
    .required()
    
  });
  return schema.validate(signup);
}

module.exports = {
  signup,
  validatesignup
};