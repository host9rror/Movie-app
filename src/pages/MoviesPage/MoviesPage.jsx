import { useState, useEffect, useCallback } from "react";
import { searchMovies } from "../../movieApi";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(async (searchQuery) => {
    try {
      const results = await searchMovies(searchQuery || query);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  }, [query]);

  useEffect(() => {
    const savedQuery = searchParams.get('query');
    if (savedQuery) {
      setQuery(savedQuery);
      handleSearch(savedQuery);
    }
  }, [searchParams, handleSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
    handleSearch(query);
  };

  return (
    <div className={css.formContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button className={css.searchBtn} type="submit">Search</button>
      </form>
      <MovieList movies={searchResults} query={query} />
    </div>
  );
};

export default MoviesPage;
