import React from "react";
import axios from "axios";

const CommentSection = ({ comments, props }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputs = () => {
      return {
        name: e.target.name.value,
        comment: e.target.comment.value
      };
    };

    axios
      .post(`http://localhost:8080/people/${props.id}/comments`, inputs())
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    e.target.reset();
    alert("Comment Submitted");
    window.location.reload();
  };

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" required placeholder="Enter Name..."></input>
        <input name="comment" required placeholder="Enter Comment..."></input>
        <button type="submit">Submit</button>
      </form>
      {comments ? (
        comments.map((comment, index) => {
          return (
            <div key={index}>
              <p>Time: {comment.timestamp}</p>
              <p>Name: {comment.name}</p>
              <p>Comment: {comment.comment}</p>
            </div>
          );
        })
      ) : (
        <div>LOADING...</div>
      )}
    </>
  );
};

export default CommentSection;
