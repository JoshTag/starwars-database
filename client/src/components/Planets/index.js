import React, { useState } from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { getID } from "./../../utils/extractID"
import "../../styles/scss/_Master.scss"

const PLANETS_QUERY = gql`
  query PlanetsQuery {
    planets {
      name
      url
    }
  }
`

const Planets = ({ search }) => {
  const [planets, setPlanets] = useState([])
  const [constPlanets, setConstPlanets] = useState([])

  return (
    <div className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Planets</h2>
      <Query query={PLANETS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loding...</h4>
          if (error) alert(error)

          return (
            <>
              <form className="section-Container__search">
                <input
                  className="section-Container__search__search-bar"
                  name="search"
                  placeholder="Search Character..."
                  required
                  onKeyUp={event => {
                    search(event, constPlanets, planets, setPlanets)
                  }}
                />
              </form>
              <ul className="section-Container__list">
                {data.planets.map(planet => {
                  const { name, url } = planet
                  return (
                  <li
                    className="section-Container__list__item"
                    key={getID(url, 29)}
                  >
                    <Link
                      className="section-Container__list__item--link"
                      to={`/planets/${getID(url, 29)}`}
                    >
                      <p id="planet-list-item">{planet.name}</p>
                    </Link>
                  </li>
                  )
                })}
              </ul>
            </>
          )
        }}
      </Query>
      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Planets
