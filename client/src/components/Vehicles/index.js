import React from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getID } from "../../utils/utils"
import "../../styles/scss/_Master.scss"

const VEHICLES_QUERY = gql`
  query VehiclesQuery {
    vehicles {
      name
      model
      vehicle_class
      url
    }
  }
`

const Vehicles = ({ search }) => {
  const { loading, error, data } = useQuery(VEHICLES_QUERY)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">vehicles</h2>
      <ul className="section-Container__list">
        {data.vehicles.map(vehicle => {
          const { name, model, vehicle_class, url } = vehicle
          return (
            <li className="section-Container__list__item" key={getID(url, 27)}>
              <Link
                className="section-Container__list__item--link"
                to={`/vehicles/${getID(url, 30)}`}
              >
                <p>{name}</p>
                <p>Model: {model}</p>
                <p>Class: {vehicle_class}</p>
              </Link>
            </li>
          )
        })}
      </ul>

      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>
    </section>
  )
}

export default Vehicles
