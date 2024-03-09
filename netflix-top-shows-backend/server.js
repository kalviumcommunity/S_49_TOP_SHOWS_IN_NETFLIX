const express = require('express');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoose=require('mongoose')

const cors=require('cors')

const Joi=require("joi")

const {signup,schema}=require('./models/login');

const ShowsModel=require('./models/shows')
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(cookieParser());

const port = process.env.PUBLIC_PORT || 3000;

app.use(express.json());

const uri = process.env.DATABASE_URL;
const key=process.env.JWT_KEY;

async function Connection(){
    await mongoose.connect(uri)
    console.log("connected to DB")
}

async function getAll(){
        var x=await ShowsModel.find();
        return x;  
}

app.get('/shows',async (req,res)=>{    
       let value=await  getAll();
       res.send(value)
})

app.get('/signups',async (req,res)=>{    
  let value=await  getAll();
  res.send(value)
})


// async function signUpController(req, res) {
//   try {
//     console.log(req.body);
//     const { error } = validatesignup(req.body);
//     if (error) {
//       console.log(error)
//       return res.status(400).send(error.details[0].message);
//     }

//     const { email, password } = req.body;
//     const newsignup = new signup({
//       email,
//       password
  
//     });
//     await newsignup.save();
//     +
//     res.status(201).send('signup  successful');


//   } catch (error) {
//     console.error('Error submitting signup:', error);
//     res.status(500).send('Internal Error');
//    }
// }
// app.post('/signup', signUpController);

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const { error } = schema.validate({email, password });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const existingUser = await signup.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different one.",
      });
    }

    const newUser = new signup({ email,password });
    await newUser.save();
    const token=jwt.sign({email},key,{expiresIn:"17h"});

    res.cookie("email", email);
    res.cookie("jwt",token);

    res.json({
      success: true,
      message: "Signup successful",
      email,
    });
    console.log("Signup success",req.cookies.email);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


app.post("/api/logout", (req, res) => {
  res.clearCookie("email");
  res.json({ success: true, message: "Logout successful" });
});

app.post('/shows', async (req, res) => {
  try {
    const data = req.body;
    console.log(data, "sdsdsds");
      const newShow = await ShowsModel.create({
        title: data.title,
        image: data.image,
        year: data.year,
        certificate: data.certificate,
        runtime: data.runtime,
        genre: data.genre,
        rating: data.rating,
        director: data.director,
        stars: data.stars,
        votes: data.votes,
        url: data.url,
        description: data.description,
        email:data.email
      });
    
      res.status(201).json(newShow);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});


app.delete('/shows/:id', async (req, res) => {    
  const id = req.params.id;
console.log(id);
try {
    await ShowsModel.findByIdAndDelete(id);
    res.json({ message: "deleted" });
} catch (error) {
    res.status(500).json({ error: "internal" });
}
});



Connection().then(()=>{
  app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
      });
})

module.exports = app;