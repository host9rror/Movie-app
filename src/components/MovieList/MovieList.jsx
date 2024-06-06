import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import PropTypes from 'prop-types';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies) {
    return <div>Loading...</div>;
  }

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200';

  if (movies.length > 0) {
    return (
      <div className={css.movieList}>
        {movies.map(movie => (
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            key={movie.id}
          >
            <div className={css.movieItem}>
              <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
