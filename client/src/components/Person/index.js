import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import "../../styles/scss/_Master.scss"
import "./Persons.scss"

const PERSON_QUERY = gql`
  query PersonQuery($id: Int!) {
    person(id: $id) {
      name
      height
      gender
      mass
      hair_color
      skin_color
      eye_color
      birth_year
    }
  }
`

const Person = ({ match }) => {
  let { id } = match.params
  id = parseInt(id)

  return (
    <div className="individual-Container">
      <div className="individual-stars" />
      <Query query={PERSON_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
          if (error) alert(error)

          const {
            name,
            height,
            gender,
            mass,
            hair_color,
            skin_color,
            eye_color,
            birth_year,
          } = data.person
          return (
            <>
              <h3 className="individual-Container__header">{name}</h3>
              <p>Height: {height}</p>
              <p>Gender: {gender}</p>
              <p>Mass: {mass}</p>
              <p>Hair Colour: {hair_color}</p>
              <p>Skin Colour: {skin_color}</p>
              <p>Eye Colour: {eye_color}</p>
              <p>Birth Year: {birth_year}</p>
            </>
          )
        }}
      </Query>
      <Link to={"/characters"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Person
