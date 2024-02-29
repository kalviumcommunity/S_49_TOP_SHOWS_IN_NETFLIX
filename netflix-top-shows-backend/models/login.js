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

  const schema = Joi.object({
    
    email: Joi.string().required(),
    password: Joi.string().required(),  
  });

 

module.exports = {
  signup,
  schema
};