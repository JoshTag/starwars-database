import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentSection from "../CharacterComments";
import "../../Styles/scss/_Master.scss";
import "./Persons.scss";

const Person = props => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:8080/people/${props.id}`)
      .then(res => {
        setCharacter(res.data);
      })
      .catch(err => {
        alert(err)
      });
  }, [props.id]);

  return (
    <>
      {loading === true ? (
        <div className="individual-Container">
          <div className="individual-stars" />
          <h3 className="individual-Container__header">
            {typeof character.name === "string"
              ? character.name.toLowerCase()
              : null}
          </h3>
          <p>Height: {character.height}</p>
          <p>Gender: {character.gender}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Colour: {character.hair_color}</p>
          <p>Skin Colour: {character.skin_color}</p>
          <p>Eye Colour: {character.eye_color}</p>
          <p>Birth Year: {character.birth_year}</p>
          <CommentSection character={character} comments={character.comments} />
        </div>
      ) : (
        <div>LOADING...</div>
      )}
    </>
  );
};

export default Person;
