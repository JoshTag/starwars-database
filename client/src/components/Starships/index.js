import React, { useState } from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { getID } from "./../../utils/extractID"
import "../../styles/scss/_Master.scss"

const STARSHIPS_QUERY = gql`
  query StarshipsQuery {
    starships {
      name
      model
      starship_class
      url
    }
  }
`

const Starships = ({ search }) => {
  const [starships, setStarships] = useState([])
  const [constStarships, setConstStarships] = useState([])

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">starships</h2>
      <Query query={STARSHIPS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
          if (error) alert(error)

          return (
            <>
              <form className="section-Container__search">
                <input
                  className="section-Container__search__search-bar"
                  name="search"
                  placeholder="Search Starships..."
                  required
                  onKeyUp={event => {
                    search(event, constStarships, starships, setStarships)
                  }}
                />
              </form>
              <ul className="section-Container__list">
                {data.starships.map(ship => {
                    const { name, model, starship_class, url } = ship
                    return (
                      <li
                        className="section-Container__list__item"
                        key={getID(url, 31)}
                      >
                        <Link
                          className="section-Container__list__item--link"
                          to={`/starships/${getID(url, 31)}`}
                        >
                          <p>{name.toLowerCase()}</p>
                          <p>Model: {model}</p>
                          <p>Class: {starship_class}</p>
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

export default Starships
