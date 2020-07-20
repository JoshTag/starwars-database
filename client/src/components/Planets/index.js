import React from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getID } from "../../utils/utils"
import "../../styles/scss/_Master.scss"

const PLANETS_QUERY = gql`
  query PlanetsQuery {
    planets {
      name
      url
    }
  }
`

const Planets = () => {
  const { loading, error, data } = useQuery(PLANETS_QUERY)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Planets</h2>
      <ul className="section-Container__list">
        {data.planets.map(planet => {
          const { name, url } = planet
          return (
            <li className="section-Container__list__item" key={getID(url, 29)}>
              <Link
                className="section-Container__list__item--link"
                to={`/planets/${getID(url, 29)}`}
              >
                <p id="planet-list-item">{name}</p>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Planets
