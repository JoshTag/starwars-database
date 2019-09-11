import React from "react";
import axios from "axios";
import SubmittedComments from "../SubmittedComments"
import "./CharacterComments.scss";

const CommentSection = ({character, comments }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputs = () => {
      return {
        name: e.target.name.value,
        comment: e.target.comment.value
      };
    };

    axios
      .post(`http://localhost:8080/people/${character.id}`, inputs())
      .catch(err => {
        alert(err);
      });

    alert("Comment Submitted");
    window.location.reload();
  };

  console.log(character);
  

  return (
    <section className="character-Comments">
      <div>
      <h3 className="character-Comments__header">Comments</h3>
      <form className="character-Comments__form" onSubmit={handleSubmit}>
        <div className="character-Comments__form">
          <label>Name</label>
          <textarea id="name-input" name="name" required placeholder="Enter Name..."></textarea>
        </div>
        <div className="character-Comments__form">
          <label>Comment</label>
          <textarea id="comment-input" name="comment" required placeholder="Enter Comment..."></textarea>
        </div>
        <button className="character-Comments__button" type="submit">Submit</button>
      </form>
      </div>
      <div className="comment-container">
      {comments ? (
        comments.map((comment, index) => {
          return (
          <SubmittedComments comment={comment} key={index} character={character} /> )
          // return (
          //   <div className="comment-container__comment" key={index}>
          //     <p>Name: {comment.name}</p>
          //     <p>Comment: {comment.comment}</p>
          //     <p>{formatDate(comment.timestamp)}</p>
          //     <button className="comment-container__btn"  onClick={handleDelete}>Delete</button>
          //   </div>
          // );
        })
      ) : (
        <div>LOADING...</div>
      )}
      </div>
    </section>
  );
};

export default CommentSection;
