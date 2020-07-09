import React, { useState } from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { getID } from "./../../utils/extractID"
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
  const [vehicles, setVehicles] = useState([])
  const [constVehicles, setConstVehicles] = useState([])

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">vehicles</h2>
      <Query query={VEHICLES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
          if (error) alert(error)

          return (
            <>
              <form className="section-Container__search">
                <input
                  className="section-Container__search__search-bar"
                  name="search"
                  placeholder="Search Vehicle..."
                  required
                  onKeyUp={event => {
                    search(event, constVehicles, vehicles, setVehicles)
                  }}
                />
              </form>
              <ul className="section-Container__list">
                {data.vehicles.map(vehicle => {
                  const { name, model, vehicle_class, url } = vehicle
                  return (
                    <li
                      className="section-Container__list__item"
                      key={getID(url, 27)}
                    >
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
            </>
          )
        }}
      </Query>
      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>
    </section>
  )
}

export default Vehicles
