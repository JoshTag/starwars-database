import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Styles/scss/_Master.scss";
import "./Character.scss";

const Characters = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/people/`)
      .then(res => {
        setPeople(res.data);
      })
      .catch(err => {
        alert(err);
      });
  }, []);
  // const searchCharacter = e => {
  //   e.preventDefault();

  //   axios
  //     .get(`http://localhost:8080/people/`)
  //     .then(res => {
  //       setConstPeople(res.data);
  //     });

  //   let findCharacter = constPeople.filter(
  //     name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
  //   );

  //   // axios.get(`http://localhost:8080/people/`).then(() => {
  //   //   setSearch(findCharacter);
  //   // });

  //   e.target.reset();
  // };

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Characters</h2>
      <form className="section-Container__search">
        <textarea
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
        />
        <button type="submit">Search</button>
      </form>
      <ul className="section-Container__list">
        {people.map(person => {
          return (
            <li className="section-Container__list__item" key={person.id}>
              <Link
                className="section-Container__list__item--link"
                to={`/characters/${person.id}`}
              >
                <p>{person.name.toLowerCase()}</p>
                <p>Birth Year: {person.birth_year}</p>
                <p>Gender: {person.gender}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Characters;
