import React, { useState, useEffect } from "react";

const CommentSection = ({comments}) => {
  return (
    <>
      <h3>Comments</h3>
      { comments ? comments.map((comment, index) => {
        return (
          <div key={index}>
            <p>Name: {comment.name}</p>
            <p>Comment: {comment.comment}</p>
          </div>
        );
      }) : null }
    </>
  );
};

export default CommentSection;
