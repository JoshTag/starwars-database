const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    id: Number,
    name: String,
    height: String, 
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    comments: Array,
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;