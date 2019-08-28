import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter"

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:8080/vehicles").then(res => {
      setVehicles(res.data);
    });
  }, []);

  return (
    <section className="section-Container">
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
