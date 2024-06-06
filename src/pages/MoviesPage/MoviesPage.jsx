import { useState, useEffect } from "react";
import { searchMovies } from "../../movieApi";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useNavigate } from "react-router-dom";
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuery = new URLSearchParams(location.search).get('query');
    if (savedQuery) {
      setQuery(savedQuery);
      handleSearch(savedQuery);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    try {
      const results = await searchMovies(searchQuery || query);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/movies?query=${query}`, { state: { query, searchResults } });
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
