import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/scss/_Master.scss";

const Ship = props => {
  const [ship, setShip] = useState({});

  useEffect(() => {
    axios(`http://localhost:8080/starships/${props.match.params.id}`).then(
      res => {
        setShip(res.data);
      }
    );
  }, [props.match.params.id]);

  return (
    <>
      <div className="individual-Container">
        <div className="individual-stars" />
        <h3 className="individual-Container__header">
          {typeof ship.name === "string" ? ship.name.toLowerCase() : null}
        </h3>
        <p>Model: {ship.model}</p>
        <p>Manufacturer: {ship.manufacturer}</p>
        <p>Length: {ship.length}</p>
        <p>Max Atmosphering Speed: {ship.max_atmosphering_speed}</p>
        <p>Crew: {ship.crew}</p>
        <p>Passengers: {ship.passenger}</p>
        <p>Cargo Capacity: {ship.cargo_capacity}</p>
        <p>Hyperdrive Rating: {ship.hyperdrive_rating}</p>
        <p>Starship Class: {ship.starship_class}</p>
      </div>
    </>
  );
};

export default Ship;
