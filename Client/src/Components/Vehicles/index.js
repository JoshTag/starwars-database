import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter"
import { useSpring, animated } from 'react-spring'
import img from "../../Assets/Images/Hacker.svg";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 20}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 4 - 200}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3 - 100}px,${y / 7 - 10}px,0)`

const Vehicles = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 200, friction: 140 } }))
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
      <div className="parralax-container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <animated.img style={{ transform: props.xy.interpolate(trans3) }} className="img-one" src={img} />
        <animated.img style={{ transform: props.xy.interpolate(trans2) }} className="img-one" src={img} />
        <animated.img style={{ transform: props.xy.interpolate(trans4) }} className="img-one" src={img} />
        <animated.div style={{ transform: props.xy.interpolate(trans1) }} className="character-stars" />
        <animated.div style={{ transform: props.xy.interpolate(trans1) }} className="character-stars" />
      </div>
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
