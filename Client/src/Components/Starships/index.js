import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";
import "../../Styles/scss/_Master.scss"

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:8080/starships").then(res => {
      setStarships(res.data);
    });
  }, []);

  return (
    <section className="section-Container">
      <h2 className="section-Container__header">starships</h2>
      {loading === true ? (
        <ul className="section-Container__list">
          {starships.map((ship, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <A className="section-Container__list__item--link" href={`/starships/${ship.id}`}>
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
