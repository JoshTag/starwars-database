import React from "react";
import Main from "./Components/Main";
import Characters from "./Components/Characters";
import Person from "./Components/Person";
import Starships from "./Components/Starships";
import Ship from "./Components/Ship";
import Vehicles from "./Components/Vehicles";
import Vehicle from "./Components/Vehicle";
import Planets from "./Components/Planets";
import Planet from "./Components/Planet";
import ErrorPage from "./Components/Error";

const routes = {
  "/": () => <Main />,
  "/characters": () => <Characters />,
  "/characters/:id": ({id}) => <Person id={id}/>,
  "/starships": () => <Starships />,
  "/starships/:id": ({id}) => <Ship id={id} />,
  "/vehicles": () => <Vehicles />,
  "/vehicles/:id": ({id}) => <Vehicle id={id}/>,
  "/planets": () => <Planets />,
  "/planets/:id": ({id}) => <Planet id={id}/>,
  "": () => <ErrorPage />
};

export default routes;
