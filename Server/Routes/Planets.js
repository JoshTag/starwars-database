const { Router } = require("express");
const router = Router();
const planets = require("../Data/Planets.json");

const getPlanets = (req, res) => {
  res.json(
    planets.map(({ id, name, population, climate, gravity }) => ({
      id,
      name, 
      population, 
      climate, 
      gravity
    }))
  );
};

const getSinglePlanet = (req, res) => {
  const findID = planets.find(planet => planet.id == req.params.id);

  if (!findID) {
    res.status(404).json({ error: "No Planet Found With That ID" });
  }

  res.json(findID);
};

router.get("/", getPlanets);
router.get("/:id", getSinglePlanet);


module.exports = router;
