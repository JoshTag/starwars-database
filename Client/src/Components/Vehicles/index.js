import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Vehicles = props => {
  const [vehicles, setVehicles] = useState([]);
  const [constVehicles, setConstVehicles] = useState([]);

  props.getData("vehicles", setVehicles, setConstVehicles);

  const VehicleList = () => (
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
  );

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <form className="section-Container__search">
        <input
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Vehicle..."
          required
          onKeyUp={event => {
            props.search(event, constVehicles, vehicles, setVehicles);
          }}
        />
      </form>
      <h2 className="section-Container__header">vehicles</h2>
      {vehicles.length > 0 ? (
        <VehicleList />
      ) : (
        <p>There is no vehicle by that name</p>
      )}
    </section>
  );
};

export default Vehicles;
