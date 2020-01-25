const { Router } = require("express");
const router = Router();
const people = require("../Data/People.json");
// const People = require("../index");
const shortid = require("shortid");
// const mongoose = require("mongoose");
// const db = mongoose.connection;

const getPeople = async (req, res) => {
  // const getAllPeople = await db.collection("starwars_data.people").find({});
  // res.json(getAllPeople);

  // console.log(People.People)

  // const getAllCharacters = await People.People.find({});

  // try {
  //   res.send(getAllCharacters);
  // } catch (err) {
  //   res.status(500).send(err);
  // }

  // try {
  //   // const characters = await db.collection("starwars_data").find({});
  //   console.log("---------------------------")
  //   // db.collection("starwars_data").find({}).toArray((error, result) => {
  //   //   if (error) throw error;
  //   //   console.log(result)
  //   // })
  //   console.log(db.find())
  //   res.status(200).send("characters");
  // } catch (err) {
  //   res.status(400).send({ message: err })
  // }


  // People.find()
  //   .then(people => res.status(200).send(people))
  //   .catch(err => res.status(400).send("Error" + err))

  // console.log(db.collection('sample_supplies.sales').find());

  // People.find((error, result) => {
  //   if(error) {
  //       return res.status(500).send(error);
  //   }
  //   res.status(200).send(result);
  // });


  res.send(
    people.map(({ character_id, name, birth_year, gender }) => ({
      character_id,
      name,
      birth_year,
      gender
    }))
  );
};

const getSingleperson = (req, res) => {
  const findID = people.find(person => person.character_id == req.params.character_id);

  if (!findID) {
    res.status(400).send({ error: "No Person Found With That ID" });
  }

  res.send(findID);
};

const postComment = (req, res) => {
  let date = new Date();
  let timestamp = date.getTime();

  const matchPeople = people.find(person => person.character_id == req.params.character_id);
  const { comment, name } = req.body;
  const newComment = {
    comment_id: shortid.generate(),
    name,
    comment,
    timestamp: timestamp
  };
  matchPeople.comments.push(newComment);
  res.status(201).send(matchPeople);
};

const deleteComment = (req, res) => {
  const deletedCommentId = req.params.commentid;
  const matchPeople = people.find(person => person.character_id == req.params.character_id);

  matchPeople.comments.splice(deletedCommentId, 1);

  const removeComment = matchPeople.comments.filter(
    comment => comment.comment_id !== deletedCommentId
  );

  res.send(removeComment);
};

router.get("/", getPeople);
router.get("/:character_id", getSingleperson);
router.post("/:character_id/comments", postComment);
router.delete("/:character_id/comments/:commentid", deleteComment);

module.exports = router;
