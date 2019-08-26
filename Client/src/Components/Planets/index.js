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
    <div>
      <h2>Planets</h2>
      <div>
        {loading === true ? (
          <div>
            {planets.map((planet, index) => {
              return (
                <A href={`/planets/${planet.id}`} key={index}>
                  <h4>Name: {planet.name}</h4>
                </A>
              );
            })}
          </div>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Planets;
