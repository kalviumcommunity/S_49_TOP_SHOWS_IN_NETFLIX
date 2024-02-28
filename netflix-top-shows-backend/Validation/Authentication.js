const express = require("express");
const Joi = require("joi");
// const { validateSignup } = require("./validator");
const app = express();

let users = [
  { id: 1, movie: 'hi pappa', rating: '10' },
  { id: 2, movie: 'yeh jawani hai deewani', rating: '10' }
];

// Read (GET) all users
app.get('/signup', (req, res) => {
  res.json(users);
});

app.use(express.json());

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});

app.post("/signup", (req, res) => {
  // Validation
  const { error, value } = validateSignup(req.body);

  if (error) {
    console.log(error);
    return res.send(error.details);
  }

  // Assuming req.body has the necessary fields
  const newUser = {
    id: users.length + 1,
    email: req.body.email,
    password: req.body.password
  };

  users.push(newUser);

  res.send("Successfully signed up!");
});

app.listen(3000, () => {
  console.log("Server started on port 4000");
});

// This line will cause an error as validateSignup is not defined here.
// exports.validateSignup = validator(signupSchema);
