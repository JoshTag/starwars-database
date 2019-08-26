const { Router } = require("express");
const router = Router();
const vehicles = require("../Data/Vehicles.json");

const getVechiles = (req, res) => {
  res.json(
    vehicles.map(({ id, name, model, vehicle_class }) => ({
      id,
      name,
      model,
      vehicle_class
    }))
  );
};

const getSingleVechile = (req, res) => {
  const findID = vehicles.find(vehicle => vehicle.id == req.params.id);

  if (!findID) {
    res.status(404).json({ error: "No Vehicle Found With That ID" });
  }

  res.json(findID);
};

router.get("/", getVechiles);
router.get("/:id", getSingleVechile);

module.exports = router;
