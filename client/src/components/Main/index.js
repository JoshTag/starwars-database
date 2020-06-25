import React from "react";
import "./Main.scss"
import { useSpring, animated } from 'react-spring'


const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 70}px,${y /70}px,0)`
const trans2 = (x, y) => `translate3d(${x / 10 + 35}px,${y / -10 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 2.5}px,${y / -5}px,0)`
const trans5 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`
const transHeader = (x, y) => `translate3d(${x / -20.5}px,${y / -20.5}px,0)`
const transBackground = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`

const Main = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 200, friction: 100 } }))
  return (
    <section className="hero" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.h1 className="card-header" style={{ transform: props.xy.interpolate(transHeader) }} >Star Wars Database</animated.h1>
      <animated.div className="img1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div className="img2" style={{ transform: props.xy.interpolate(trans2) }} />
      <animated.div className="img3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div className="img4" style={{ transform: props.xy.interpolate(trans4) }} />
      <animated.div className="img5" style={{ transform: props.xy.interpolate(trans5) }} />
      <animated.div id="stars" style={{ transform: props.xy.interpolate(transBackground) }} />
      <p>&copy; Joshua Taguicana 2020</p>
      <p>Made with help from www.swapi.com</p>
    </section>
  );
};

export default Main;
