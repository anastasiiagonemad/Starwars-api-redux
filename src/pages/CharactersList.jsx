import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/charactersSlice';
import { Link } from 'react-router-dom';
import './characters.css';

const CharactersList = () => {
  const dispatch = useDispatch();
  const { characters, next, previous, status } = useSelector(
    (state) => state.characters,
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNext = () => {
    if (next) {
      dispatch(fetchCharacters(next));
    }
  };

  const handlePrevious = () => {
    if (previous) {
      dispatch(fetchCharacters(previous));
    }
  };

  return (
    <div className="characters__cards">
      <div className="characters__cards-title">
        <h1>Star Wars Characters</h1>
      </div>

      <div className="characters__cards-input">
        <input
          type="text"
          placeholder="Search Characters"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="characters__cards-status">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && (
          <p>Failed to load characters.Please try again.</p>
        )}
        {status === 'succeeded' && filteredCharacters.length === 0 && (
          <p>No characters found</p>
        )}
      </div>

      <div className="characters__cards-list">
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.name}>
              <Link
                className="characters__cards-list-name"
                to={`/character/${character.name}`}
              >
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="characters__cards-buttons">
        <button onClick={handlePrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersList;
