import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";

const Planets = () => {
  const [planets, setPlanet] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:8080/planets").then(res => {
      setPlanet(res.data);
    });
  }, []);

  return (
    <div className="section-Container">
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
