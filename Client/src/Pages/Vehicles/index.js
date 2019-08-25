import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <Link to="/people">People</Link>
      <Link to="/starships">Starships</Link>
      <Link to="/vehicles">Vehicles</Link>
      <div>
        {loading === true ? (
          <ul>
            {vehicles.map((vehicle, index) => (
              <li key={index}>
                {vehicle.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
