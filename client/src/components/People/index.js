import React, { useState } from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { getID } from "./../../utils/extractID"
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

const Characters = ({ search }) => {
  const [people, setPeople] = useState([])
  const [constPeople, setConstPeople] = useState([])

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Characters</h2>
      <Query query={PEOPLE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
          if (error) alert(error)

          return (
            <>
              <form className="section-Container__search">
                <input
                  className="section-Container__search__search-bar"
                  name="search"
                  placeholder="Search Character..."
                  required
                  onKeyUp={event => {
                    search(event, constPeople, people, setPeople)
                  }}
                />
              </form>
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

export default Characters
