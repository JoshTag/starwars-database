require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const starships = require("./Routes/Starships");
const vehicles = require("./Routes/Vehicles");
const people = require("./Routes/People");
const planets = require("./Routes/Planets");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connects back-end with the mongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("mongoDB Connected!! ¯\\_(ツ)_/¯ "));

// cors configuration 
const corsConfig = {
  origin: ["http://localhost:3000"]
};
app.use(cors(corsConfig));


// routes
app.use("/starships", starships);
app.use("/vehicles", vehicles);
app.use("/people", people);
app.use("/planets", planets);

app.listen(port, () => console.log(`We chillin on port ${port}`));
