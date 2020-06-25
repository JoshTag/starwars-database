const { Router } = require("../node_modules/express");
const router = Router();
const starships = require("../Data/Starships.json.js.js.js");
const firebase = require("../node_modules/firebase");
const database = firebase.database();

// Gets all data for starships
const getStarships = (req, res) => {
  const dbRefObject = database.ref().child("/starships");

  if (!dbRefObject) {
    res.json({ error: "No Starships Found" });
  }
  dbRefObject.on("value", snap => res.send(snap.val()));
};

// Gets single person from starship array
const getSingleShip = (req, res) => {
  let starshipList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/starships/`)
    .once("value")
    .then(snap => {
      starshipList = snap.val();

      const findID = starshipList.find(
        starship => starship.starship_id == req.params.starship_id
      );
      idIndex = starshipList.indexOf(findID);

      if (!findID) {
        res.json({ error: "No Starship Found with the ID" });
      }
      firebase
        .database()
        .ref(`/starships/${idIndex}`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

router.get("/", getStarships);
router.get("/:starship_id", getSingleShip);

module.exports = router;
