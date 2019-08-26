const { Router } = require("express");
const router = Router();
const people = require("../Data/People.json");
const shortid = require('shortid');

const getPeople = (req, res) => {
  res.json(
    people.map(({ id, name, birth_year, gender }) => ({
      id,
      name,
      birth_year,
      gender
    }))
  );
};

const getSingleperson = (req, res) => {
  const findID = people.find(person => person.id == req.params.id);

  if (!findID) {
    res.status(404).json({ error: "No Person Found With That ID" });
  }

  res.json(findID);
};

const postComment = (req, res, next) => {
  const matchPeople = people.find(person => person.id == req.params.id);
  const { comment, name } = req.body;
  const newComment = {
    id: shortid.generate(),
    comment,
    name,
    timestamp: new Date()
  };
  matchPeople.comments.push(newComment);
  res.json(matchPeople);
};

router.get("/", getPeople);
router.get("/:id", getSingleperson);
router.post("/:id/comments", postComment);

module.exports = router;
