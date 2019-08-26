import React, { useState, useEffect } from "react";
import axios from "axios";

const Planet = (props) => {
  const [planet, setPlanet] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:8080/planets/${props.id}`).then(res => {
      setPlanet(res.data);
    });
  }, [props.id]);

  return (
    <>
      {loading === true ? (
        <div>
          <h3>Name: {planet.name}</h3>
          <p>Rotation Period: {planet.rotation_period}</p>
          <p>Orbital Period: {planet.orbital_period}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Climate: {planet.climatet}</p>
          <p>Gravity: {planet.gravity}</p>
          <p>Terrain: {planet.terrain}</p>
          <p>Surface Water: {planet.surface_water}</p>
          <p>Population: {planet.population}</p>
        </div>
      ) : null}
    </>
  );
};

export default Planet;
