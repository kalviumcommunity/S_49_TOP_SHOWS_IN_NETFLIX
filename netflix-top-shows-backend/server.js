
const express = require('express');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoose=require('mongoose')
const cors=require('cors')

const app = express();
app.use(cors());
const port = process.env.PUBLIC_PORT || 3000;

const ShowsModel=require('./models/shows')

app.use(express.json());

// MongoDB connection URL
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
app.post('/shows', async (req, res) => {
  try {
      const {
          title,
          image,
          year,
          certificate,
          runtime,
          genre,
          rating,
          description,
          director,
          stars,
          votes,
          url
      } = req.body;

      const newShow = new ShowsModel({
          title,
          image,
          year,
          certificate,
          runtime,
          genre,
          rating,
          description,
          director,
          stars,
          votes,
          url
      });

      await newShow.save();
      res.status(201).json(newShow);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.put('/shows/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      image,
      year,
      certificate,
      runtime,
      genre,
      rating,
      description,
      director,
      stars,
      votes,
      url
    } = req.body;

    // Find the show by ID and update its data
    const updatedShow = await ShowsModel.findByIdAndUpdate(id, {
      title,
      image,
      year,
      certificate,
      runtime,
      genre,
      rating,
      description,
      director,
      stars,
      votes,
      url
    }, { new: true }); // Set { new: true } to return the updated document

    res.status(200).json(updatedShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/shows/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the show by ID and delete it
    await ShowsModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const routes = require('./routes')
app.use('/netflix', routes);

Connection().then(()=>{
  
  app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
      });
})

module.exports = app;

