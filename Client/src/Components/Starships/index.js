import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  // const [constStarships, setConstStarships] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/starships/`)
      .then(res => {
        setStarships(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  // const searchCharacter = e => {
  //   e.preventDefault();

  //   getStarships();

  //   let findStarships = constStarships.filter(
  //     name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
  //   );

  //   axios.get(`http://localhost:8080/starships/`)
  //     .then(() => {
  //       setStarships(findStarships);
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });

  //   e.target.reset();
  // };

  // const getStarships = () => {
  //   axios.get(`http://localhost:8080/starships/`)
  //     .then(res => {
  //       setStarships(res.data);
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  return (
    <section className="section-Container">
      <h2 className="section-Container__header">starships</h2>
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
      <ul className="section-Container__list">
        {starships.map(ship => {
          return (
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
          );
        })}
      </ul>
    </section>
  );
};

export default Starships;
