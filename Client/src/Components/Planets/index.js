import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";
import "../../Styles/scss/_Master.scss";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [constPlanets, setConstPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStarships();
  }, []);

  useEffect(() => {
    axios("http://localhost:8080/planets").then(res => {
      setConstPlanets(res.data);
    });
  }, []);

  const searchCharacter = e => {
    e.preventDefault();

    getStarships();

    let findPlanet = constPlanets.filter(
      name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
    );

    axios.get(`http://localhost:8080/planets/`).then(() => {
      setPlanets(findPlanet);
    });

    e.target.reset();
  };

  const getStarships = () => {
    axios.get(`http://localhost:8080/planets/`).then(res => {
      setPlanets(res.data);
    });
  };

  return (
    <div className="section-Container">
     <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <form className="section-Container__search" onSubmit={searchCharacter}>
        <textarea
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
        />
        <button type="submit">Search</button>
      </form>
      <h2 className="section-Container__header">Planets</h2>
      <div>
        {loading === true ? (
          <ul className="section-Container__list">
            {planets.map((planet, index) => {
              return (
                <li className="section-Container__list__item" key={index}>
                <A className="section-Container__list__item--link" href={`/planets/${planet.id}`} key={index}>
                  <p id="planet-list-item">{planet.name}</p>
                </A>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Planets;
