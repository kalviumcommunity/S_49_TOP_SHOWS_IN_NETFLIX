const mongoose = require('mongoose');

const ShowsSchema = new mongoose.Schema({

    title: String,
    image: String,
    year: String,
    certificate: String,
    runtime: String,
    genre: Array,
    rating: String,
    director: String,
    stars: Array,
    votes:String,
    url: String,
    description: String,

});

const ShowsModel = mongoose.model("Shows", ShowsSchema);

module.exports = ShowsModel;



