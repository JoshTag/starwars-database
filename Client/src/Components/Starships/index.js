import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";

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
    <div>
      <h2>Starships</h2>
      <div>
      {loading === true ? (
          <div>
            {starships.map((ship, index) => {
              return (
                <A href={`/starships/${ship.id}`} key={index}>
                  <h4>Name: {ship.name}</h4>
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

export default Starships;
