const express = require('express');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoose=require('mongoose')
const cors=require('cors')
const Joi=require("joi")

const app = express();
app.use(cors());
const port = process.env.PUBLIC_PORT || 3000;
const {signup,validatesignup}=require('./models/login');

const ShowsModel=require('./models/shows')

app.use(express.json());

const uri = process.env.DATABASE_URL;

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


async function signUpController(req, res) {
  try {
    console.log(req.body);
    const { error } = validatesignup(req.body);
    if (error) {
      console.log(error)
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;
    const newsignup = new signup({
      email,
      password
  
    });
    await newsignup.save();

    res.status(201).send('signup  successful');
  } catch (error) {
    console.error('Error submitting signup:', error);
    res.status(500).send('Internal Error');
   }
}
app.post('/signup', signUpController);




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

// setupLoginRoute(app);
// setupAddRoute(app);
// const routes = require('./routes')
// app.use('/netflix', routes);

Connection().then(()=>{
  app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
      });
})

module.exports = app;

