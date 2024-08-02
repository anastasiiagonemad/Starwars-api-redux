import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../store/charactersSlice.tsx';
import { Link, useSearchParams } from 'react-router-dom';
import './characters.css';
import { RootState, AppDispatch } from '../store/store';

const CharactersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { characters, status, count } = useSelector(
    (state: RootState) => state.characters,
  );
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Use URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const [currentPage, setCurrentPage] = useState<number>(currentPageFromUrl);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    dispatch(
      fetchCharacters(`http://swapi.dev/api/people/?page=${currentPage}`),
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    const pages = Math.ceil(count / 10);
    setTotalPages(pages);
  }, [count]);

  const performSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}`,
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    performSearch(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() }); // Update URL with page parameter
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
          <p>Failed to load characters. Please try again.</p>
        )}
        {status === 'succeeded' && searchResults.length === 0 && search && (
          <p>No characters found</p>
        )}
      </div>

      <div className="characters__cards-list">
        <ul>
          {(searchResults.length > 0 ? searchResults : characters).map(
            (character) => (
              <li key={character.name}>
                <Link
                  className="characters__cards-list-name"
                  to={`/character/${character.name}?page=${currentPage}`}
                >
                  {character.name}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>

      {searchResults.length === 0 && (
        <div className="characters__cards-buttons">
          <button
            className="characters__cards-buttons-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={
                index + 1 === currentPage
                  ? 'characters__cards-buttons-page-active'
                  : 'characters__cards-buttons-page'
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            className="characters__cards-buttons-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharactersList;
