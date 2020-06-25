import React from "react";
import axios from "axios";
import SubmittedComments from "../SubmittedComments";
import "./CharacterComments.scss";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

const CommentSection = ({ character, comments }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputs = () => {
      return {
        name: e.target.name.value,
        comment: e.target.comment.value
      };
    };

    axios
      .post(`${pingURL}/people/${character.character_id}/comments`, inputs())
      .catch(err => {
        alert(err);
      });

    window.location.reload();
  };

  return (
    <section className="character-Comments">
      <div>
        <h3 className="character-Comments__header">Comments</h3>
        <form className="character-Comments__form" onSubmit={handleSubmit}>
          <div className="character-Comments__form">
            <label>Name</label>
            <textarea
              id="name-input"
              name="name"
              required
              placeholder="Enter Name..."
            ></textarea>
          </div>
          <div className="character-Comments__form">
            <label>Comment</label>
            <textarea
              id="comment-input"
              name="comment"
              required
              placeholder="Enter Comment..."
            ></textarea>
          </div>
          <button className="character-Comments__button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="comment-container">
        {comments ? (
          Object.values(comments)
            .reverse()
            .map(comment => (
              <SubmittedComments
                comment={comment}
                key={comment.comment_id}
                character={character}
              />
            ))
        ) : (
          <p>There are currently no comments</p>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
