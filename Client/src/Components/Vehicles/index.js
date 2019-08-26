import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";

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
    <div>
      <h2>Vehicles</h2>
      <div>
      {loading === true ? (
          <div>
            {vehicles.map((vehicle, index) => {
              return (
                <A href={`/vehicles/${vehicle.id}`} key={index}>
                  <h4>Name: {vehicle.name}</h4>
                </A>
              );
            })}
          </div>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
