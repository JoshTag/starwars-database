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

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

firebase.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENTX509_CERT_URL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// cors configuration
const corsConfig = {
  origin: ["http://localhost:3000", "https://starwars-database.netlify.com"]
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
