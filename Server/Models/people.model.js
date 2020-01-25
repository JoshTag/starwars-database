const mongoose = require("../index");

console.log(mongoose)

const PeopleSchema = mongoose.Schema({
  character_id: {type: Number, require: true},
  name: { type: String, required: true },
  height: { type: String, required: true },
  mass: { type: String, required: true },
  hair_color: { type: String, required: true },
  skin_color: { type: String, required: true },
  eye_color: { type: String, required: true },
  birth_year: { type: String, required: true },
  gender: { type: String, required: true },
  comments: Array
}, {collection: "starwars_data.people"});

const People = mongoose.model("People", PeopleSchema);

module.exports = People;
