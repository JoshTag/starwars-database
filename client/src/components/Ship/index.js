import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import "../../styles/scss/_Master.scss"

const STARSHIP_QUERY = gql`
  query StarshipQuery($id: Int!) {
    starship(id: $id) {
      name
      model
      manufacturer
      starship_class
      length
      cargo_capacity
      hyperdrive_rating
      max_atmosphering_speed
      passengers
      crew
      cost_in_credits
    }
  }
`

const Ship = ({ match }) => {
  let { id } = match.params
  id = parseInt(id)

  const { loading, error, data } = useQuery(STARSHIP_QUERY, {
    variables: { id },
  })

  if (loading) return "Loading..."
  if (error) alert(error)

  const {
    name,
    model,
    manufacturer,
    starship_class,
    length,
    cargo_capacity,
    hyperdrive_rating,
    max_atmosphering_speed,
    passengers,
    crew,
    cost_in_credits,
  } = data.starship

  return (
    <div className="individual-Container">
      <div className="individual-stars" />
      <h3 className="individual-Container__header">{name.toLowerCase()}</h3>
      <p>Model: {model}</p>
      <p>Manufacturer: {manufacturer}</p>
      <p>Starship Class: {starship_class}</p>
      <p>Length: {length}</p>
      <p>Passengers: {passengers}</p>
      <p>Crew: {crew}</p>
      <p>Max Atmosphering Speed: {max_atmosphering_speed}</p>
      <p>Cargo Capacity: {cargo_capacity}</p>
      <p>Hyperdrive Rating: {hyperdrive_rating}</p>
      <p>Cost in Credits: {cost_in_credits}</p>
      <Link to={"/starships"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Ship
