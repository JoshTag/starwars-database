import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import "../../styles/scss/_Master.scss"

const PLANET_QUERY = gql`
  query PlanetQuery($id: Int!) {
    planet(id: $id) {
      name
      rotation_period
      orbital_period
      diameter
      climate
      gravity
      terrain
      surface_water
      population
    }
  }
`

const Planet = ({ match }) => {
  let { id } = match.params
  id = parseInt(id)

  const { loading, error, data } = useQuery(PLANET_QUERY, {
    variables: { id },
  })

  if (loading) return "Loading..."
  if (error) alert(error)

  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  } = data.planet

  return (
    <div className="individual-Container">
      <div className="individual-stars" />
      <h3 className="individual-Container__header">{name.toLowerCase()}</h3>
      <p>Rotation Period: {rotation_period}</p>
      <p>Orbital Period: {orbital_period}</p>
      <p>Diameter: {diameter}</p>
      <p>Climate: {climate}</p>
      <p>Gravity: {gravity}</p>
      <p>Terrain: {terrain}</p>
      <p>Surface Water: {surface_water}</p>
      <p>Population: {population}</p>
      <Link to={"/planets"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Planet
