import React, { useState, useEffect } from "react";
import axios from "axios";

const Ship = props => {
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    axios(`http://localhost:8080/vehicles/${props.match.params.id}`)
      .then(res => {
        setVehicle(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, [props.match.params.id]);

  return (
    <>
      <div className="individual-Container">
        <div className="individual-stars" />
        <h3 className="individual-Container__header">
          {typeof vehicle.name === "string" ? vehicle.name.toLowerCase() : null}
        </h3>
        <p>Model: {vehicle.model}</p>
        <p>Manufacturer: {vehicle.manufacturer}</p>
        <p>Length: {vehicle.length}</p>
        <p>Crew: {vehicle.crew}</p>
        <p>Passengers: {vehicle.passenger}</p>
        <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
        <p>Vehicle Class: {vehicle.vehicle_class}</p>
      </div>
    </>
  );
};

export default Ship;
