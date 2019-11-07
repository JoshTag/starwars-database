import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Starships = props => {
  const [starships, setStarships] = useState([]);
  const [constStarships, setConstStarships] = useState([]);

  props.getData("starships", setStarships, setConstStarships);

  const StarshipList = () => (
    <ul className="section-Container__list">
      {starships.map(ship => (
        <li className="section-Container__list__item" key={ship.id}>
          <Link
            className="section-Container__list__item--link"
            to={`/starships/${ship.id}`}
          >
            <p>{ship.name}</p>
            <p>Model: {ship.model}</p>
            <p>Class: {ship.starship_class}</p>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="section-Container">
      <h2 className="section-Container__header">starships</h2>
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <form className="section-Container__search">
        <input
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Starships..."
          required
          onKeyUp={event => {
            props.search(event, constStarships, starships, setStarships);
          }}
        />
      </form>

      {starships.length > 0 ? (
        <StarshipList />
      ) : (
        <p>There is no starship by that name</p>
      )}
    </section>
  );
};

export default Starships;
