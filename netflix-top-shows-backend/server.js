
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

Connection().then(()=>{
  
  app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
      });
})

module.exports = app;

