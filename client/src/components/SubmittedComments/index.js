import React from "react";
import axios from "axios";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:5000'}`;

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
  
  return (
    <div className="comment-container__comment">
      <p><span>Name:</span> {comment.name}</p>
      <p><span>Date:</span> {formatDate(comment.timestamp)}</p>
      <p><span>Comment:</span> {comment.comment}</p>
      <button className="comment-container__btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default SubmittedComments;
