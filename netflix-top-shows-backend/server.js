// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://vidhvathj:vajh2005@cluster0.gef69tl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define MongoDB schema and model
const Schema = mongoose.Schema;
const showSchema = new Schema({
  title: String,
  year: Number,
  certificate: String,
  runtime: String,
  genre: [String],
  rating: Number,
  description: String,
  director: String,
  stars: [String],
  votes: Number,
  url: String,
});
const Show = mongoose.model('Show', showSchema);

// Define API endpoint to fetch shows
app.get('/api/shows', async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
