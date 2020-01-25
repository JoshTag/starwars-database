import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Planets = props => {
  const [planets, setPlanets] = useState([]);
  const [constPlanets, setConstPlanets] = useState([]);

  props.getData("planets", setPlanets, setConstPlanets);

  const PlanetList = () => (
    <ul className="section-Container__list">
      {planets.map(planet => (
          <li className="section-Container__list__item" key={planet.planet_id}>
            <Link
              className="section-Container__list__item--link"
              to={`/planets/${planet.planet_id}`}
            >
              <p id="planet-list-item">{planet.name}</p>
            </Link>
          </li>
      ))}
    </ul>
  )

  return (
    <div className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Planets</h2>
      <form className="section-Container__search">
        <input
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
          onKeyUp={event => {
            props.search(event, constPlanets, planets, setPlanets);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {planets.length > 0 
        ? ( <PlanetList />) 
        : ( <p>There is no planet by that name</p>)
      }
    </div>
  );
};

export default Planets;
