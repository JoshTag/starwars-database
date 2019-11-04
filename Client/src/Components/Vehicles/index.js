import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/vehicles")
      .then(res => {
        setVehicles(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  // const searchCharacter = e => {
  //   e.preventDefault();

  //   getStarships();

  //   let findVehicles = constVehicles.filter(
  //     name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
  //   );

  //   axios.get(`http://localhost:8080/vehicles/`).then(() => {
  //     setVehicles(findVehicles);
  //   });

  //   e.target.reset();
  // };

  // const getStarships = () => {
  //   axios.get(`http://localhost:8080/vehicles/`).then(res => {
  //     setVehicles(res.data);
  //   });
  // };

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <form className="section-Container__search" >
        <textarea
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
        />
        <button type="submit">Search</button>
      </form>
      <h2 className="section-Container__header">vehicles</h2>
      <ul className="section-Container__list">
        {vehicles.map(vehicle => {
          return (
            <li className="section-Container__list__item" key={vehicle.id}>
              <Link
                className="section-Container__list__item--link"
                to={`/vehicles/${vehicle.id}`}
              >
                <p>{vehicle.name}</p>
                <p>Model: {vehicle.model}</p>
                <p>Class: {vehicle.vehicle_class}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Vehicles;
