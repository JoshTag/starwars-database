const { Router } = require("express");
const router = Router();
const firebase = require("firebase/app");
const database = firebase.database();

// Gets all data for people
const getPeople = (req, res) => {
  const dbRefObject = database.ref().child("/people");

  if (!dbRefObject) {
    res.json({ error: "No Characters Found" });
  }
  dbRefObject.on("value", snap => res.json(snap.val()));
};

// Gets single person from people array
const getSinglePerson = (req, res) => {
  let peopleList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/people/`)
    .once("value")
    .then(snap => {
      peopleList = snap.val();

      const findID = peopleList.find(
        person => person.character_id == req.params.character_id
      );
      idIndex = peopleList.indexOf(findID);

      if (!findID) {
        res.json({ error: "No Character Found with the ID" });
      }
      firebase
        .database()
        .ref(`/people/${idIndex}`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

// Posts comments to people object
const postComment = (req, res) => {
  let peopleList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/people/`)
    .once("value")
    .then(snap => {
      peopleList = snap.val();

      const findID = peopleList.find(
        person => person.character_id == req.params.character_id
      );

      idIndex = peopleList.indexOf(findID);

      const date = new Date();
      const timestamp = date.getTime();
      const commentKey = firebase
        .database()
        .ref(`/people/${idIndex}/comments/`)
        .push().key;
      const { comment, name } = req.body;
      const newComment = {
        comment_id: commentKey,
        name,
        comment,
        timestamp: timestamp
      };

      let updates = {};
      updates[`/people/${idIndex}/comments/${commentKey}`] = newComment;

      if (!newComment) {
        res.json({ error: "Please enter a valid comment" });
      }
      firebase
        .database()
        .ref()
        .update(updates);
      firebase
        .database()
        .ref(`/people/${idIndex}/`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

// Deletes comment
const deleteComment = (req, res) => {
  let peopleList = [];
  let idIndex;
  firebase
    .database()
    .ref(`/people/`)
    .once("value")
    .then(snap => {
      peopleList = snap.val();

      const deletedCommentId = req.params.commentid;
      const findPerson = peopleList.find(
        person => person.character_id == req.params.character_id
      );

      idIndex = peopleList.indexOf(findPerson);

      firebase
        .database()
        .ref(`/people/${idIndex}/comments/${deletedCommentId}`)
        .remove();

      if (!deletedCommentId) {
        res.json({ error: "Cannot delete comment" });
      }
      firebase
        .database()
        .ref(`/people/${idIndex}`)
        .once("value")
        .then(snap => {
          res.json(snap.val());
        });
    });
};

router.get("/", getPeople);
router.get("/:character_id", getSinglePerson);
router.post("/:character_id/comments", postComment);
router.delete("/:character_id/comments/:commentid", deleteComment);

module.exports = router;
