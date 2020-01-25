const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  population: { type: String, required: true },
  climate: { type: String, required: true },
  gravity: { type: String, required: true },
  rotation_period: { type: String, required: true },
  orbital_period: { type: String, required: true },
  diameter: { type: String, required: true },
  terrain: { type: String, required: true },
  surface_water: { type: String, required: true },
});

const Planet = mongoose.model("Planet", PlanetSchema);

module.exports = Planet;
