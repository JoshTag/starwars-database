const { Router } = require("express");
const router = Router();
const vehicles = require("../Data/Vehicles.json");

const getVechiles = (req, res) => {
  res.json(
    vehicles.map(({ vehicle_id, name, model, vehicle_class }) => ({
      vehicle_id,
      name,
      model,
      vehicle_class
    }))
  );
};

const getSingleVechile = (req, res) => {
  const findID = vehicles.find(vehicle => vehicle.vehicle_id == req.params.vehicle_id);

  if (!findID) {
    res.status(404).json({ error: "No Vehicle Found With That ID" });
  }

  res.json(findID);
};

router.get("/", getVechiles);
router.get("/:vehicle_id", getSingleVechile);

module.exports = router;
