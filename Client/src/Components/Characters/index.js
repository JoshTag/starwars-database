import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";
import "./Character.scss";

const Characters = props => {
  const [people, setPeople] = useState([]);
  const [constPeople, setConstPeople] = useState([]);
  const [loaded, setLoaded] = useState(false);

  props.getData("people", setPeople, setConstPeople, loaded, setLoaded);

  const CharacterList = () => (
    <ul className="section-Container__list">
      {people.map(person => (
        <li className="section-Container__list__item" key={person.character_id}>
          <Link
            className="section-Container__list__item--link"
            to={`/characters/${person.character_id}`}
          >
            <p>{person.name.toLowerCase()}</p>
            <p>Birth Year: {person.birth_year}</p>
            <p>Gender: {person.gender}</p>
          </Link>
        </li>
      ))}
    </ul>
  );

  const Loading = () => {
    return loaded === false ? <p>Loading Data...</p> : <p>There is no character by that name</p>
  }

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Characters</h2>
      <form className="section-Container__search">
        <input
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
          onKeyUp={event => {
            props.search(event, constPeople, people, setPeople);
          }}
        />
      </form>
      {people.length > 0 
        ? ( <CharacterList /> )
        : ( <Loading /> )
      }
      <Link to={"/"}className="back-btn" >&larr; Back</Link>
    </section>
  );
};

export default Characters;
