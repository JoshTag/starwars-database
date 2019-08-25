import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h2>Main</h2>
      <Link to="/people">People</Link>
      <Link to="/starships">Starships</Link>
      <Link to="/vehicles">Vehicles</Link>
    </div>
  );
};

export default Main;
