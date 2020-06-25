const { Router } = require("../node_modules/express");
const router = Router();
const vehicles = require("../Data/Vehicles.json.js.js.js");
const firebase = require("../node_modules/firebase");
const database = firebase.database();

// Gets all data for vehicles
const getVechiles = (req, res) => {
  const dbRefObject = database.ref().child("/vehicles");

  if (!dbRefObject) {
    res.json({ error: "No Vehicles Found" });
  }
  dbRefObject.on("value", snap => res.send(snap.val()));
};

// Gets single person from vehicle array
const getSingleVechile = (req, res) => {
  let vehicleList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/vehicles/`)
    .once("value")
    .then(snap => {
      vehicleList = snap.val();

      const findID = vehicleList.find(
        starship => starship.starship_id == req.params.starship_id
      );
      idIndex = vehicleList.indexOf(findID);

      if (!findID) {
        res.json({ error: "No Vehicle Found with the ID" });
      }
      firebase
        .database()
        .ref(`/vehicles/${idIndex}`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

router.get("/", getVechiles);
router.get("/:vehicle_id", getSingleVechile);

module.exports = router;
