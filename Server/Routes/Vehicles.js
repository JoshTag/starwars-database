const { Router } = require("express");
const router = Router();
const vehicles = require("../Data/Vehicles.json");
const shortid = require('shortid');

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
    res.status(404).json({ error: "No ship Found With That ID" });
  }

  res.json(findID);
};

const postComment = (req, res, next) => {
  const matchVehicle = vehicles.find(vehicle => vehicle.id == req.params.id);
  const { comment, name } = req.body;
  const newComment = {
    id: shortid.generate(),
    comment,
    name,
    timestamp: new Date()
  };
  // console.log(req.body, req.params)
  matchVehicle.comments.push(newComment);
  res.json(matchVehicle);
};

router.get("/", getVechiles);
router.get("/:id", getSingleVechile);
router.post("/:id/comments", postComment);

module.exports = router;
