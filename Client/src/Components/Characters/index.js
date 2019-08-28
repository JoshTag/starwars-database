import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter"
import "./Characters.scss"

const Characters = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:8080/people").then(res => {
      setPeople(res.data);
    });
  }, []);

  return (
    <section className="section-Container">
      <h2 className="section-Container__header">Characters</h2>
      {loading === true ? (
        <ul className="section-Container__list">
          {people.map((person, index) => {
            return (
              <li className="section-Container__list__item" key={index}>
                <A className="section-Container__list__item--link" href={`/characters/${person.id}`}>
                  <p>{(person.name).toLowerCase()}</p>
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

