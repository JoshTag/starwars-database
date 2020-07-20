import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
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

  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: { id },
  })

  if (loading) return "Loading..."
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
    <div className="individual-Container">
      <div className="individual-stars" />
      <h3 className="individual-Container__header">{name.toLowerCase()}</h3>
      <p>Height: {height}</p>
      <p>Gender: {gender}</p>
      <p>Mass: {mass}</p>
      <p>Hair Colour: {hair_color}</p>
      <p>Skin Colour: {skin_color}</p>
      <p>Eye Colour: {eye_color}</p>
      <p>Birth Year: {birth_year}</p>
      <Link to={"/characters"} className="back-btn">
        &larr; Back
      </Link>
    </div>
  )
}

export default Person
