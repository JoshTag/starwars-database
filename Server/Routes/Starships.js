const { Router } = require("express");
const router = Router();
const starships = require("../Data/Starships.json");
const shortid = require("shortid");

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
    res.status(404).json({ error: "No ship Found With That ID" });
  }

  res.json(findID);
};

const postComment = (req, res, next) => {
  const matchShip = starships.find(ship => ship.id == req.params.id);
  const { comment, name } = req.body;
  const newComment = {
    id: shortid.generate(),
    comment,
    name,
    timestamp: new Date()
  };
  matchShip.comments.push(newComment);
  res.json(matchShip);
};

router.get("/", getStarships);
router.get("/:id", getSingleShip);
router.post("/:id/comments", postComment);

module.exports = router;
