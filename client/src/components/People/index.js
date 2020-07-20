import React from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getID } from "../../utils/utils"
import "../../styles/scss/_Master.scss"
import "./Character.scss"

const PEOPLE_QUERY = gql`
  query PeopleQuery {
    people {
      name
      gender
      birth_year
      url
    }
  }
`

const Characters = () => {
  const { loading, error, data } = useQuery(PEOPLE_QUERY)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Characters</h2>
      <ul className="section-Container__list">
        {data.people.map(person => {
          const { name, gender, birth_year, url } = person
          return (
            <li
              className="section-Container__list__item"
              key={`person ${getID(url, 28)}`}
            >
              <Link
                className="section-Container__list__item--link"
                to={`/characters/${getID(url, 28)}`}
              >
                <p>{name.toLowerCase()}</p>
                <p>Birth Year: {birth_year}</p>
                <p>Gender: {gender}</p>
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

export default Characters
