import React, { useState, useEffect } from "react";
import axios from "axios";

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

const Planet = props => {
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    // setLoading(true);
    axios(`${pingURL}/planets/${props.match.params.id}`).then(res => {
      setPlanet(res.data);
    });
  }, [props.match.params.id]);

  return (
    <>
      <div className="individual-Container">
        <div className="individual-stars" />
        <h3 className="individual-Container__header">
          {typeof planet.name === "string" ? planet.name.toLowerCase() : null}
        </h3>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Diameter: {planet.diameter}</p>
        <p>Climate: {planet.climatet}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Population: {planet.population}</p>
      </div>
    </>
  );
};

export default Planet;
