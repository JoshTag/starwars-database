import React from "react";
import axios from "axios";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

const SubmittedComments = ({ comment, character }) => {
  const formatDate = date => {
    let newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  };

  const handleDelete = () => {
    axios
      .delete(
        `${pingURL}/people/${character.character_id}/comments/${comment.comment_id}`
      )
      .catch(err => {
        alert(err);
      });

    window.location.reload();
  };

  console.log(comment);

  return (
    <div className="comment-container__comment">
      <p>Name: {comment.name}</p>
      <p>Comment: {comment.comment}</p>
      <p>{formatDate(comment.timestamp)}</p>
      <button className="comment-container__btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default SubmittedComments;
