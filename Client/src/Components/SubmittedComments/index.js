import React from 'react';
import axios from "axios";

const SubmittedComments = ({comment, character}) => {

  const formatDate = (date) => {
    let newDate = new Date (date)
    return `${newDate.getMonth() + 1 }/${newDate.getDate()}/${newDate.getFullYear()}`
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/people/${character.id}`)
    console.log(character.id, comment.id);
  }

  return (
      <div className="comment-container__comment">
        <p>Name: {comment.name}</p>
        <p>Comment: {comment.comment}</p>
        <p>{formatDate(comment.timestamp)}</p>
        <button className="comment-container__btn" onClick={handleDelete}>Delete</button>
      </div>
  )
}

export default SubmittedComments