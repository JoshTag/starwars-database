import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";

const Vehicles = props => {
  const [vehicles, setVehicles] = useState([]);
  const [constVehicles, setConstVehicles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  props.getData("vehicles", setVehicles, setConstVehicles, loaded, setLoaded);

  const VehicleList = () => (
    <ul className="section-Container__list">
      {vehicles.map(vehicle => {
        return (
          <li className="section-Container__list__item" key={vehicle.vehicle_id}>
            <Link
              className="section-Container__list__item--link"
              to={`/vehicles/${vehicle.vehicle_id}`}
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

  const Loading = () => {
    return loaded === false ? <p>Loading Data...</p> : <p>There is no vehicle by that name</p>
  }

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">vehicles</h2>
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
      {vehicles.length > 0 
        ? ( <VehicleList /> ) 
        : ( <Loading /> )
      }
      <Link to={"/"}className="back-btn" >&larr; Back</Link>
    </section>
  );
};

export default Vehicles;
