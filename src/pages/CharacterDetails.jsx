import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './character.css';

const CharacterDetails = () => {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?search=${name}`,
        );
        setCharacter(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character:', error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>No character found</p>;

  return (
    <div className="character__card">
      <div className="character__card-title">
        <h1>{character.name}</h1>
      </div>

      <div className="character__card-description">
        <p>
          Height: <span>{character.height}</span>
        </p>
        <p>
          Mass: <span>{character.mass}</span>
        </p>
        <p>
          Hair Color: <span>{character.hair_color}</span>
        </p>
        <p>
          Skin Color: <span>{character.skin_color}</span>
        </p>
        <p>
          Eye Color: <span>{character.eye_color}</span>
        </p>
        <p>
          Birth Year: <span>{character.birth_year}</span>
        </p>
        <p>
          Gender: <span>{character.gender}</span>
        </p>
      </div>

      <div className="character__card-returnBtn">
        <Link className="character__card-returnBtn-btn" to="/">
          Back to Characters List
        </Link>
      </div>
    </div>
  );
};

export default CharacterDetails;
