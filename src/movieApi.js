import axios from 'axios';

const API_KEY = '69d6d3cb4c7062e5069e6bd3ea4e6c2a';
const BASE_URL = 'https://api.themoviedb.org/3/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

async function fetchPopularMovies() {
  try {
    const response = await axiosInstance.get('movie/popular');
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch popular movies');
  }
}

async function searchMovies(query) {
  try {
    const response = await axiosInstance.get('search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
}

async function fetchMovieDetails(movieId) {
  try {
    const response = await axiosInstance.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
}

async function fetchMovieCast(movieId) {
  try {
    const response = await axiosInstance.get(`movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    throw new Error('Failed to fetch movie cast');
  }
}

async function fetchMovieReviews(movieId) {
  try {
    const response = await axiosInstance.get(`movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch movie reviews');
  }
}

export {
  fetchPopularMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews
};
