import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../movieApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css'

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchPopularMovies();
        setMovies(trendingMovies); 
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies(); 
  }, []);

  return (
    <>
      <h1 className={css.MainText}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default Home;
