const { Router } = require("express");
const router = Router();
const people = require("../Data/People.json");
const shortid = require("shortid");

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

const postComment = (req, res) => {
  let date = new Date();
  let timestamp = date.getTime();

  const matchPeople = people.find(person => person.id == req.params.id);
  const { comment, name } = req.body;
  const newComment = {
    id: shortid.generate(),
    name,
    comment,
    timestamp: timestamp
  };
  matchPeople.comments.push(newComment);
  res.json(matchPeople);
};

const deleteComment = (req, res) => {
  const deletedCommentId = req.params.commentid;
  const matchPeople = people.find(person => person.id == req.params.id);
  
  let i = matchPeople.comments.indexOf(matchPeople.comments.deletedCommentId)
  matchPeople.comments.splice(deletedCommentId, 1)

  const removeComment = matchPeople.comments.filter(
    comment => comment.id !== deletedCommentId
  );


  res.json(removeComment);
  console.log(matchPeople, deletedCommentId, i);
  
};

router.get("/", getPeople);
router.get("/:id", getSingleperson);
router.post("/:id/comments", postComment);
router.delete("/:id/comments/:commentid", deleteComment);

module.exports = router;
