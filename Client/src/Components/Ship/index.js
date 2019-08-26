import React, { useState, useEffect } from "react";
import axios from "axios";

const Ship = (props) => {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:8080/starships/${props.id}`).then(res => {
      setShip(res.data);
    });
  }, [props.id]);

  return (
    <>
      {loading === true ? (
        <div>
          <h3>Name: {ship.name}</h3>
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
      ) : null}
    </>
  );
};

export default Ship;
