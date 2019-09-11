import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";
import "../../Styles/scss/_Master.scss";
import "./Character.scss";

const Characters = () => {
  const [people, setPeople] = useState([]);
  const [constPeople, setConstPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople();
  }, []);

  useEffect(() => {
    axios("http://localhost:8080/people").then(res => {
      setConstPeople(res.data);
    });
  });

  const searchCharacter = e => {
    e.preventDefault();

    getPeople();

    let findCharacter = constPeople.filter(
      name => name.name.toLowerCase() === e.target.search.value.toLowerCase()
    );

    axios.get(`http://localhost:8080/people/`).then(() => {
      setPeople(findCharacter);
    });

    e.target.reset();
  };

  const getPeople = () => {
    axios.get(`http://localhost:8080/people/`).then(res => {
      setPeople(res.data);
    });
  };

  return (
    <section className="section-Container">
      <div className="star-container">
        <div className="character-stars" />
        <div className="character-stars" />
        <div className="character-stars" />
      </div>
      <h2 className="section-Container__header">Characters</h2>
      <form className="section-Container__search" onSubmit={searchCharacter}>
        <textarea
          className="section-Container__search__search-bar"
          name="search"
          placeholder="Search Character..."
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading === true ? (
        <ul className="section-Container__list">
          {people.map((person, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <A
                  className="section-Container__list__item--link"
                  href={`/characters/${person.id}`}
                >
                  <p>{person.name.toLowerCase()}</p>
                  <p>Birth Year: {person.birth_year}</p>
                  <p>Gender: {person.gender}</p>
                </A>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>LOADING...</h4>
      )}
    </section>
  );
};

export default Characters;
