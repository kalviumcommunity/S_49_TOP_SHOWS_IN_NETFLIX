const mongoose = require('mongoose');

const ShowsSchema = new mongoose.Schema({
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
    url: String
});

const ShowsModel = mongoose.model("Shows", ShowsSchema);
module.exports = ShowsModel;
