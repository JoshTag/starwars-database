import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentSection from "../CharacterComments";
import "../../Styles/scss/_Master.scss";
import "./Persons.scss";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

const Person = props => {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    axios(`${pingURL}/people/${props.match.params.id}`)
      .then(res => {
        setCharacter(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, [props.match.params.id]);

  return (
    <>
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
        <Link to={"/characters"}className="back-btn" >&larr; Back</Link>
      </div>
    </>
  );
};

export default Person;
