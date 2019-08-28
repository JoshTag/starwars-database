import React from "react";
import { useRoutes, A } from "hookrouter";
import routes from "../router";
import ErrorPage from "../Components/Error";
import "./App.scss"

function App() {
  const routeResult = useRoutes(routes);

  return (
    <div className="pageContainer">
      <div className="linkContainer">
        <A className="linkContainer__link" href="/">Main</A>
        <A className="linkContainer__link" href="/characters">People</A>
        <A className="linkContainer__link" href="/starships">Starships</A>
        <A className="linkContainer__link" href="/vehicles">vehicles</A>
        <A className="linkContainer__link" href="/planets">Planets</A>
      </div>
      {routeResult || <ErrorPage />}
    </div>
  );
}

export default App;
