const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const starships = require("./Routes/Starships");
const vehicles = require("./Routes/Vehicles");
const people = require("./Routes/People");
const planets = require("./Routes/Planets");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsConfig = {
  origin: ["http://localhost:3000"]
};
app.use(cors(corsConfig));

app.use("/starships", starships);
app.use("/vehicles", vehicles);
app.use("/people", people);
app.use("/planets", planets);

app.listen(port, () => console.log(`listening on port ${port}`));
