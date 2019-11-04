import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  // const [constPlanets, setConstPlanets] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios("http://localhost:8080/planets")
      .then(res => {
        setPlanets(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  // const searchCharacter = e => {
  //   e.preventDefault();

  //   getStarships();

  //   let findPlanet = constPlanets.filter(
  //     name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
  //   );

  //   axios.get(`http://localhost:8080/planets/`).then(() => {
  //     setPlanets(findPlanet);
  //   });

  //   e.target.reset();
  // };

  // const getStarships = () => {
  //   axios
  //     .get(`http://localhost:8080/planets/`)
  //     .then(res => {
  //       setPlanets(res.data);
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  return (
    <div className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <form className="section-Container__search">
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
        <ul className="section-Container__list">
          {planets.map((planet, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <Link
                  className="section-Container__list__item--link"
                  to={`/planets/${planet.id}`}
                  key={index}
                >
                  <p id="planet-list-item">{planet.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Planets;
