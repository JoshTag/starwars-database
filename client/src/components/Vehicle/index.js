import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import "../../styles/scss/_Master.scss"

const VEHICLE_QUERY = gql`
  query VehicleQuery($id: Int!) {
    vehicle(id: $id) {
      name
      model
      manufacturer
      vehicle_class
      length
      max_atmosphering_speed
      crew
      passengers
      cargo_capacity
      cost_in_credits
    }
  }
`

const Vehicle = ({ match }) => {
  let { id } = match.params
  id = parseInt(id)

  const { loading, error, data } = useQuery(VEHICLE_QUERY, {
    variables: { id },
  })

  if (loading) return "Loading..."
  if (error) alert(error)

  const {
    name,
    model,
    manufacturer,
    vehicle_class,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    cost_in_credits,
  } = data.vehicle

  return (
    <>
      <div className="individual-Container">
        <div className="individual-stars" />
        <h3 className="individual-Container__header">{name.toLowerCase()}</h3>
        <p>Model: {model}</p>
        <p>Manufacturer: {manufacturer}</p>
        <p>Vehicle Class: {vehicle_class}</p>
        <p>Max Atmosphering Speed: {max_atmosphering_speed}</p>
        <p>Length: {length}</p>
        <p>Crew: {crew}</p>
        <p>Passengers: {passengers}</p>
        <p>Cargo Capacity: {cargo_capacity}</p>
        <p>Cost in Credits: {cost_in_credits}</p>
        <Link to={"/vehicles"} className="back-btn">
          &larr; Back
        </Link>
      </div>
    </>
  )
}

export default Vehicle
