import { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'))
const Navigation = lazy(() => import('../Navigation/Navigation'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'))

function App() {
  return (
    <div className="container">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
