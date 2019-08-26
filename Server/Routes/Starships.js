const { Router } = require("express");
const router = Router();
const starships = require("../Data/Starships.json");

const getStarships = (req, res) => {
  res.json(
    starships.map(({ id, name, model, starship_class }) => ({
      id,
      name,
      model,
      starship_class
    }))
  );
};

const getSingleShip = (req, res) => {
  const findID = starships.find(ship => ship.id == req.params.id);

  if (!findID) {
    res.status(404).json({ error: "No Ship Found With That ID" });
  }

  res.json(findID);
};

router.get("/", getStarships);
router.get("/:id", getSingleShip);

module.exports = router;
