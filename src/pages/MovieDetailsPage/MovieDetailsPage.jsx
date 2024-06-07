import { useEffect, useState, Suspense, useRef } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews } from '../../movieApi'; 
import BackLink from '../../components/BackLink/BackLink';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const prevLocation = useRef(location.state)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);

        const castData = await fetchMovieCast(movieId);
        setCast(castData);

        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieId]);

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200';

  return (
    <div className={css.container}>
      <BackLink className={css.gaBackBtn} to={prevLocation.current?.from ?? '/movies'}>Go back</BackLink> 
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <div className={css.imgAndp}>
            <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt={`${movie.title} poster`} />
            <div>
            <p className={css.userScore}>User Score: {movie.vote_average.toFixed(1)}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul className={css.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          </div>
          </div>
          <div className={css.navLinks}>
            <h2>Additional information</h2>
            <nav>
              <ul>
                <li>
                  <NavLink to={`cast`} state={location.state} className={css.menu__link}>
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`reviews`} state={location.state} className={css.menu__link}>
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet context={{ cast, reviews }} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;