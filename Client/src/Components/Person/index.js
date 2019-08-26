import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentSection from "../CharacterComments";

const Person = (props) => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:8080/people/${props.id}`).then(res => {
      setCharacter(res.data);
    });
  }, [props.id]);

  // console.log(character.comments)

  return (
    <>
      {loading === true ? (
        <div>
          <h3>Name: {character.name}</h3>
          <p>Height: {character.height}</p>
          <p>Gender: {character.gender}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Colour:x {character.hair_color}</p>
          <p>Skin Colour: {character.skin_color}</p>
          <p>Eye Colour: {character.eye_color}</p>
          <p>Birth Year: {character.birth_year}</p>
          <CommentSection loading={loading} comments={character.comments}/>
        </div>
      ) : null}
    </>
  );
};

export default Person;
