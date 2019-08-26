import React, { useState, useEffect } from "react";
import axios from "axios";
import { A } from "hookrouter";

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
    <div>
      <h2>Characters</h2>
      <div>
        {loading === true ? (
          <div>
            {people.map((person, index) => {
              return (
                <A href={`/characters/${person.id}`} key={index}>
                  <h4>Name: {person.name}</h4>
                </A>
              );
            })}
          </div>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Characters;
