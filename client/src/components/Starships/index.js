import React from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getID } from "../../utils/utils"
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

const Starships = () => {
  const { loading, error, data } = useQuery(STARSHIPS_QUERY)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">starships</h2>
      <ul className="section-Container__list">
        {data.starships.map(ship => {
          const { name, model, starship_class, url } = ship
          return (
            <li className="section-Container__list__item" key={getID(url, 31)}>
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
      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>
    </section>
  )
}

export default Starships
