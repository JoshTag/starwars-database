import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import data from "../../Data/Data";

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:8080/people").then(res => {
      setPeople(res.data);
    });
  }, []);

  return (
    <div>
      <Link to="/people">People</Link>
      <Link to="/starships">Starships</Link>
      <Link to="/vehicles">Vehicles</Link>
      <h2>People</h2>
      <div>
        {loading === true ? (
          <ul>
            {people.map((person, index) => (
              <li key={index}>
                {person.name}
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

export default People;
