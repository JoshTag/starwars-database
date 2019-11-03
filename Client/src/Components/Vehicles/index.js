import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter"
import "../../Styles/scss/_Master.scss";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [constVehicles, setConstvehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStarships();
  }, []);

  useEffect(() => {
    axios("http://localhost:8080/vehicles").then(res => {
      setConstvehicles(res.data);
    });
  }, []);

  const searchCharacter = e => {
    e.preventDefault();

    getStarships();

    let findVehicles = constVehicles.filter(
      name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
    );

    axios.get(`http://localhost:8080/vehicles/`).then(() => {
      setVehicles(findVehicles);
    });

    e.target.reset();
  };

  const getStarships = () => {
    axios.get(`http://localhost:8080/vehicles/`).then(res => {
      setVehicles(res.data);
    });
  };

  return (
    <section className="section-Container">
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
      <h2 className="section-Container__header">vehicles</h2>
      {loading === true ? (
        <ul className="section-Container__list">
          {vehicles.map((vehicle, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <A className="section-Container__list__item--link" href={`/vehicles/${vehicle.id}`}>
                  <p>{vehicle.name}</p>
                  <p>Model: {vehicle.model}</p>
                  <p>Class: {vehicle.vehicle_class}</p>
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

export default Vehicles;
