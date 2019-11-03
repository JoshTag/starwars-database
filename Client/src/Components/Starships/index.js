import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";
import "../../Styles/scss/_Master.scss";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [constStarships, setConstStarships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStarships();
  }, []);

  useEffect(() => {
    axios("http://localhost:8080/starships").then(res => {
      setConstStarships(res.data);
    });
  }, []);

  const searchCharacter = e => {
    e.preventDefault();

    getStarships();

    let findStarships = constStarships.filter(
      name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
    );

    axios.get(`http://localhost:8080/starships/`).then(() => {
      setStarships(findStarships);
    });

    e.target.reset();
  };

  const getStarships = () => {
    axios.get(`http://localhost:8080/starships/`).then(res => {
      setStarships(res.data);
    });
  };

  return (
    <section className="section-Container">
      <h2 className="section-Container__header">starships</h2>
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
      {loading === true ? (
        <ul className="section-Container__list">
          {starships.map((ship, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <A
                  className="section-Container__list__item--link"
                  href={`/starships/${ship.id}`}
                >
                  <p>{ship.name}</p>
                  <p>Model: {ship.model}</p>
                  <p>Class: {ship.starship_class}</p>
                </A>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>LOADING...</p>
      )}
    </section>
  );
};

export default Starships;
