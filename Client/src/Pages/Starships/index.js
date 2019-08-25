import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <Link to="/people">People</Link>
      <Link to="/starships">Starships</Link>
      <Link to="/vehicles">Vehicles</Link>
      <h2>Starships</h2>
      <div>
        {loading === true ? (
          <ul>
            {starships.map((ship, index) => (
              <li key={index}>
                {ship.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Starships;
