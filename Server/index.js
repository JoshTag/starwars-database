require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Firebase setup
const firebase = require("firebase/app");
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://starwars-database-81ddb.firebaseio.com'
});

// cors configuration
const corsConfig = {
  origin: ["http://localhost:3000"]
};
app.use(cors(corsConfig));

// Routes imports
const starships = require("./Routes/Starships");
const vehicles = require("./Routes/Vehicles");
const people = require("./Routes/People");
const planets = require("./Routes/Planets");

// routes
app.use("/starships", starships);
app.use("/vehicles", vehicles);
app.use("/people", people);
app.use("/planets", planets);



app.listen(port, () => console.log(`We chillin on port ${port}`));
