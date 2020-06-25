import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/scss/_Master.scss";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

const Ship = props => {
  const [ship, setShip] = useState({});

  useEffect(() => {
    axios(`${pingURL}/starships/${props.match.params.id}`).then(
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
        <Link to={"/starships"}className="back-btn" >&larr; Back</Link>
      </div>
    </>
  );
};

export default Ship;
