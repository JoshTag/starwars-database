const { Router } = require("express");
const router = Router();
const planets = require("../Data/Planets.json.js.js.js");
const firebase = require("../node_modules/firebase");
const database = firebase.database();

// Gets all data for planets
const getPlanets = (req, res) => {
  const dbRefObject = database.ref().child("/planets");

  if (!dbRefObject) {
    res.json({ error: "No Planets Found" });
  }
  dbRefObject.on("value", snap => res.send(snap.val()));
};

// Gets single person from planet array
const getSinglePlanet = (req, res) => {
  let planetList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/planets/`)
    .once("value")
    .then(snap => {
      planetList = snap.val();

      const findID = planetList.find(
        planet => planet.planet_id == req.params.planet_id
      );
      idIndex = planetList.indexOf(findID);

      if (!findID) {
        res.json({ error: "No Planet Found with the ID" });
      }
      firebase
        .database()
        .ref(`/planets/${idIndex}`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

router.get("/", getPlanets);
router.get("/:planet_id", getSinglePlanet);

module.exports = router;
