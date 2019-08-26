import React from 'react'
import { Link } from "react-router-dom"
import { useRoutes, A } from "hookrouter";
import routes from "../../router";
import ErrorPage from "../Error"

function Nav() {
  const routeResult = useRoutes(routes);

  return (
    <div>
      {/* <Link to="/">Main</Link>
      <Link to="/characters">characters</Link>
      <Link to="/starships">Starships</Link>
      <Link to="/vehicles">Vehicles</Link> */}

      <A href="/">Main</A>
      <A href="/characters">People</A>
      <A href="/starships">Starships</A>
      <A href="/vehicles">Vehicles</A>
      <A href="/planets">planets</A>
      {routeResult || <ErrorPage />}
    </div>
  )
}

export default Nav;