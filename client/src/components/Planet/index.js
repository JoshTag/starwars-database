import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import axios from "axios"
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

  return (
    <div className="individual-Container">
      <div className="individual-stars" />
      <Query query={PLANET_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
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
            <>
              <h3 className="individual-Container__header">
                {name.toLowerCase()}
              </h3>
              <p>Rotation Period: {rotation_period}</p>
              <p>Orbital Period: {orbital_period}</p>
              <p>Diameter: {diameter}</p>
              <p>Climate: {climate}</p>
              <p>Gravity: {gravity}</p>
              <p>Terrain: {terrain}</p>
              <p>Surface Water: {surface_water}</p>
              <p>Population: {population}</p>
            </>
          )
        }}
      </Query>
      <Link to={"/planets"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Planet
